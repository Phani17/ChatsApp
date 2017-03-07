//var date=new Date();
var moment=require('moment');

//date.add(100,'year').subtract(9,'months');
//console.log(date.format('MMM YYYY'));
var createdAt=1334;
var date=moment(createdAt);
console.log(date.format('h:mm a'));
