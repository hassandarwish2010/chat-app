<?php

namespace App\Http\Controllers;

use App\Events\MessageDelivered;
use App\Message;
use App\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }//end of con

    public function index(){
        $messages=Message::with('users')->get();
       // dd($messages);
        return view('messages.index',compact('messages'));
    }//end of index
public function store(Request $request){
        $mess=auth()->user()->messages()->create($request->all());
        // $message=$mess->with('users')->get();
     $user=User::where('id',$mess->user_id)->first();
    // dd($user);
    broadcast(new MessageDelivered($mess,$user))->toOthers();
}
}//end of class
