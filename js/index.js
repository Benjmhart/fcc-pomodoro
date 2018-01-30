/*to do
4c. create alert and play a sound.
*/
//base timer object
var timerOb={
  'work': 25,
  'break':5,
};
//sound 

  var sound= new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
//global that will be assigned to the interval function
var int='';
//function to input times in p tags (will trigger on ready and when setup values change)
function update(){
  //update work span
  $("#workDisplay")[0].innerHTML=timerOb.work+':00';
  //update break span
  $("#breakDisplay")  [0].innerHTML=timerOb.break+':00';
  //update timer span
  $("#timerDisplay")[0].innerHTML=timerOb.work+':00';
  
}
$( document ).ready(update());
//listener function on + and Minus butons

$('.timeChange').click(function(event){
  //determine what button got pressed and then update the UI with new values
  var val = event.target.attributes.val.value;
  if (val=='+w'){
    timerOb.work++;
  }
  if (val=='-w'){
    //prevent negative values
    if(timerOb.work!=0){
      timerOb.work--;
    }
  }
  if (val=='+b'){
    timerOb.break++;
  }
  if (val=='-b'){
    //prevent negative values
    if(timerOb.break!=0){
      timerOb.break--;
    }
  }
  update();
});
//click listener on GO
$('#timerGo').click(function(){
  //setup
  var timerMin=timerOb.work;
  var timerSec=':00';
  var onBreak=false;
  //begin Work countdown
  int= window.setInterval(function(){
    //normal case for non zero seconds
    if (timerSec!=':00'){
        //get the  number of seconds
      var tmp=Number(timerSec.substr(1,2));
        //subtract one and put it back into a string
      tmp--;
      tmp=String(tmp);
        //if there's only one digit, tack on a zero
        if(tmp.length==1){
          tmp='0'+tmp;
        }
      //put the seconds back together
      timerSec=':'+(String(tmp));      
    }
    //case if seconds are in zeroes, set the seconds to 59 and remove a minute
    else{
      //case if the timer has hit zero minutes, zero seconds
      if(timerMin===0){
        if(onBreak===false){
          sound.play();
          alert('take a break!');
          timerMin=timerOb.break;
          timerSec=':00';
          onBreak = !onBreak;
        }
        else{
          sound.play();
          alert('back to work!')
          timerMin = timerOb.work;
          timerSec=':00';
          onBreak= !onBreak;
        }
      }
      //case if seconds are in zeroes and there are more minutes, set the seconds to 59 and remove a minute
      timerSec=':59';
      timerMin--;
    }
    console.log(timerMin+timerSec);
    $("#timerDisplay")[0].innerHTML=timerMin+timerSec;  
     
  },1000);
});
//reset function
 $('#reset').click(function(){
   clearInterval(int);
   update();
 })