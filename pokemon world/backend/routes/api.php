<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PokemonController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//取得所有寶可夢資料
Route::get('pokemon',[PokemonController::class,'index']);
//取得單一寶可夢資料
Route::get('pokemon/{id}',[PokemonController::class,'getOnePokemon']);

//取得指定會員資料
Route::get('member/{id}',[MemberController::class,'index']);
//會員登入
Route::post('member',[MemberController::class,'login']);
//取得指定會員出戰隊伍
Route::get('getTeam/{id}',[MemberController::class,'getTeam']);
//新增會員資料
Route::post('register',[MemberController::class,'register']);
//更新會員資料
Route::post('update',[MemberController::class,'update']);
//寄送信箱認證信
Route::get('sendMail/{email}',[MemberController::class,'sendMail']);
//更新會員信箱認證
Route::get('activeMail/{email}',[MemberController::class,'activeMail']);
//寄送重設密碼信件
Route::get('sendResetPasswordMail/{email}',[MemberController::class,'sendResetPasswordMail']);
//更新密碼
Route::post('updateNewPassword',[MemberController::class,'updateNewPassword']);
//更新點數
Route::post('updatePoint',[MemberController::class,'updatePoint']);
//新增牌庫卡片
Route::post('updateTotalCards',[MemberController::class,'updateTotalCards']);