<?php

namespace App\Http\Controllers;

use App\Models\member;
use App\Models\pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;


class MemberController extends Controller
{
    public function index($Id){
        $Id = base64_decode($Id);
        $member = member::find($Id);
        $totalCards = member::find($Id)->totalcards;
        $totalCards = explode(',',$totalCards);
        $team = member::find($Id)->team;
        $team = explode('|',$team);
        foreach($team as $key=>$values){
            $team[$key] = json_decode($values);
        }
        foreach ($totalCards as $key=>$value) {
            $totalCards[$key]=pokemon::find($value);
        }
        $member->totalcards = $totalCards;
        $member->team = $team;
        return [$member];
    }

    function register(Request $req){
        $memberpost = new member();
        $memberpost->account = $req->input('account');
        $memberpost->email = $req->input('email');
        $memberpost->password = Hash::make($req->input('password'));
        $memberpost->point = 0;
        $memberpost->totalcards ='1,4,7,10,25';
        $memberpost->team = '[1,4,7,10,25]|[]|[]|[]|[]|[]|[]|[]|[]|[]';
        $memberpost->head = 'pokemonMaster/images/025.png';
        $memberpost->teamactive = '0';
        $memberpost->emailActive = '0';
        $memberpost->save();
        return $memberpost;
    }

    function update(Request $req){
        $memberpost = member::find($req->input('memberId'));
        // $memberpost->point = $req->input('point');
        $team = $req->input('team');
        $teamString = '';
        foreach($team as $values){
            $teamString .= "[";
            foreach($values as $key=>$Tmember){
                    $teamString .= $Tmember;
                    $teamString .= ',';
            }
            $teamString = rtrim($teamString,",");
            $teamString .= "]|";
        }
        $teamString = rtrim($teamString,"|");
        $memberpost->team = $teamString;
        $memberpost->head = $req->input('headSelected');
        $memberpost->teamactive = $req->input('teamActive');
        $memberpost->update();
        return $memberpost;
    }

    function getTeam($Id){
        $Id = base64_decode($Id);
        $teamActive = member::find($Id)->teamActive;
        $team = member::find($Id)->team;
        $team = explode('|',$team);
        foreach($team as $key=>$values){
            $team[$key] = json_decode($values);
        }
        $teamActive = $team[$teamActive];
        foreach ($teamActive as $key=>$value) {
            $teamActive[$key]=pokemon::find($value);
        }
        return $teamActive;
    }

    function login(Request $req){
        $email = $req->input('email');
        $password = $req->input('password');
        $member = member::select()
        ->where('email', '=', $email)
        ->get();
        if (Hash::check($password, $member[0]->password)){
            return [base64_encode($member[0]->memberId),$member[0]->emailActive];
        }else{
            return [0,'信箱或密碼錯誤'];
        }
    }

    function sendMail($email){
        $url = "http://127.0.0.1:3000/activeMail/".$email;
        $text = '點此完成認證' . $url;
        $email = base64_decode($email);
        Mail::raw($text, function ($message) use ($email) {
            $message->to($email)->subject('信箱認證');
        });
        return response()->json(['status' => true,], 200);
    }

    function activeMail($email){
        $email = base64_decode($email);
        DB::table('members')
            ->where('email', $email)
            ->update(['emailActive' => '1']);
    }

    function sendResetPasswordMail($email){
        $url = "http://127.0.0.1:3000/newPassword/".$email;
        $text = '點此前往設置新密碼' . $url;
        $email = base64_decode($email);
        Mail::raw($text, function ($message) use ($email) {
            $message->to($email)->subject('重設密碼');
        });
        return response()->json(['status' => true,], 200);
    }

    function updateNewPassword(Request $req){
        $email = $req->input('mail');
        $password = Hash::make($req->input('password'));
        DB::table('members')
            ->where('email', $email)
            ->update(['password' => $password]);
    }


    function updatePoint(Request $req){
        $id = $req->input('id');
        $member = member::find($id);
        $member->point += $req->input('addPoint');
        $member->update();
        return 'ok';
    }

    function updateTotalCards(Request $req){
        $id = $req->input('id');
        $member = member::find($id);
        $totalcards = explode(',',$member->totalcards);
        $addCard = strval($req->input('addCard'));
        array_push($totalcards,$addCard);
        sort($totalcards);
        $totalcardsinOrder = '';
        foreach($totalcards as $card){
            $totalcardsinOrder .= $card.",";
        }
        $totalcardsinOrder=rtrim($totalcardsinOrder,",");
        $member->totalcards = $totalcardsinOrder;
        $member->update();
        return 'ok';
    }
}
