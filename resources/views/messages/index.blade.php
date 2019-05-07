@extends('layouts.app')
@section('content')

    <div class="container-fluid">
        <div class="row">

            <div class="col-md-4">
               <h3>Online Users</h3>
                <hr>
                <h5 id="no-online-users">No online Users</h5>
                <ul class="list-group" id="online-users">


                </ul>

            </div>
            <div class="col-md-8 d-flex flex-column" style="height: 80vh">
                <div class="h-100 bg-white mb-4 p-5" id="chat" style="overflow-y: scroll;">
                    <input type="hidden" id="username" value="{{auth()->user()->name}}">
                    @foreach($messages as $message)
                        <div class="st-div {{auth()->user()->id==$message->user_id ? 'right':'left'}}">
                            <p>{{$message->users->name}}</p>
                            <p>{{$message->body}}</p>
                        </div>
                        <div class="clearfix"></div>
                        @endforeach

                </div>
                <form action="" class="d-flex">
                     <input name="" id="chat-text" type="text" data-url="{{route('messages.store')}}" class="form-control" style="margin-right: 10px">
                    <button class="btn btn-primary disabled">send</button>
                </form>
            </div>
        </div>
    </div>
    @endsection