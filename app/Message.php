<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $guarded=[];
//    protected $fillable = [
//        'user_id', 'body'
//    ];

    public function users(){
        return $this->belongsTo('App\User','user_id','id');
    }
}
