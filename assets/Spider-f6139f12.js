import{_ as u,r as o,o as g,c as p,a as r,w as l,b as w,d as h}from"./index-f6fe674a.js";const m=`/* SPIDER -- a sample adventure game, by David Matuszek.
Consult this file and issue the command:   start.  */

:- dynamic([at/2,i_am_at/1,alive/1]).
:- retractall(at(_, _)), retractall(i_am_at(_)), retractall(alive(_)).

/* This defines my current location. */

i_am_at(meadow).


/* These facts describe how the rooms are connected. */

path(spider, d, cave).

path(cave, u, spider).
path(cave, w, cave_entrance).

path(cave_entrance, e, cave).
path(cave_entrance, s, meadow).

path(meadow, n, cave_entrance) :- at(flashlight, in_hand).
path(meadow, n, cave_entrance) :-
     write('Go into that dark cave without a light?  Are you crazy?'), 
     !, fail.
path(meadow, s, building).

path(building, n, meadow).
path(building, w, cage).

path(cage, e, building).

path(closet, w, building).

path(building, e, closet) :- at(key, in_hand).
path(building, e, closet) :-
     write('The door appears to be locked.'),
     fail.


/* These facts tell where the various objects in the game
are located. */

at(ruby, spider).
at(key, cave_entrance).
at(flashlight, building).
at(sword, closet).


/* This fact specifies that the spider is alive. */

alive(spider).


/* These rules describe how to pick up an object. */

take(X) :-
     at(X, in_hand),
     write('You''re already holding it!'),
      !.

take(X) :-
     i_am_at(Place),
     at(X, Place),
     retract(at(X, Place)),
     assertz(at(X, in_hand)),
     write('OK.'),
     !.

take(_) :-
     write('I don''t see it here.').


/* These rules describe how to put down an object. */

drop(X) :-
     at(X, in_hand),
     i_am_at(Place),
     retract(at(X, in_hand)),
     assertz(at(X, Place)),
     write('OK.'),!.

drop(_) :-
     write('You aren''t holding it!').


/* These rules define the six direction letters as calls to go/1. */

n :- go(n).

s :- go(s).

e :- go(e).

w :- go(w).

u :- go(u).

d :- go(d).


/* This rule tells how to move in a given direction. */

go(Direction) :-
     i_am_at(Here),
     path(Here, Direction, There),
     retract(i_am_at(Here)),
     assertz(i_am_at(There)),
     look, !.

go(_) :-
     write('You can''t go that way.').


/* This rule tells how to look about you. */

look :-
     i_am_at(Place),
     describe(Place),
     notice_objects_at(Place).


/* These rules set up a loop to mention all the objects
in your vicinity. */

notice_objects_at(Place) :-
     at(X, Place),
     write('There is a '), write(X), write(' here.'),
     fail.

notice_objects_at(_).


/* These rules tell how to handle killing the lion and the spider. */

kill :-
     i_am_at(cage),
     write('Oh, bad idea!  You have just been eaten by a lion.'), 
     !, die.

kill :-
     i_am_at(cave),
     write('This isn''t working.  The spider leg is about as tough'), 
     write('as a telephone pole, too.').

kill :-
     i_am_at(spider),
     at(sword, in_hand),
     retract(alive(spider)),
     write('You hack repeatedly at the spider''s back.  Slimy ichor'),
     write('gushes out of the spider''s back, and gets all over you.'),
     write('I think you have killed it, despite the continued twitching.'),
      !.

kill :-
     i_am_at(spider),
     write('Beating on the spider''s back with your fists has no'), 
     write('effect.  This is probably just as well.').

kill :-
     write('I see nothing inimical here.').


/* This rule tells how to die. */

die :-
     !, finish.


/* Under UNIX, the   halt.  command quits Prolog but does not
remove the output window. On a PC, however, the window
disappears before the final output can be seen. Hence this
routine requests the user to perform the final  halt.  */

finish :-
     
     write('The game is over. Please enter the   halt.   command.'),
      !.


/* This rule just writes out game instructions. */

instructions :-
     
     write('Enter commands using standard Prolog syntax.'),
     write('Available commands are:'), 
     write('start.                   -- to start the game.'), 
     write('n.  s.  e.  w.  u.  d.   -- to go in that direction.'), 
     write('take(Object).            -- to pick up an object.'), 
     write('drop(Object).            -- to put down an object.'), 
     write('kill.                    -- to attack an enemy.'), 
     write('look.                    -- to look around you again.'),
     write('instructions.            -- to see this message again.').


/* This rule prints out instructions and tells where you are. */

start :-
     instructions,
     look.


/* These rules describe the various rooms.  Depending on
circumstances, a room may have more than one description. */

describe(meadow) :-
     at(ruby, in_hand),
     write('Congratulations!!  You have recovered the ruby'),
     write('and won the game.'), 
     finish, !.

describe(meadow) :-
     write('You are in a meadow.  To the north is the dark mouth'), 
     write('of a cave; to the south is a small building.  Your'), 
     write('assignment, should you decide to accept it, is to'), 
     write('recover the famed Bar-Abzad ruby and return it to'), 
     write('this meadow.').

describe(building) :-
     write('You are in a small building.  The exit is to the north.'), 
     write('There is a barred door to the west, but it seems to be'), 
     write('unlocked.  There is a smaller door to the east.').

describe(cage) :-
     write('You are in a lion''s den!  The lion has a lean and'),
     write('hungry look.  You better get out of here!').

describe(closet) :-
     write('This is nothing but an old storage closet.').

describe(cave_entrance) :-
     write('You are in the mouth of a dark cave.  The exit is to'), 
     write('the south; there is a large, dark, round passage to'), 
     write('the east.').

describe(cave) :-
     alive(spider),
     at(ruby, in_hand),
     write('The spider sees you with the ruby and attacks!!!'), 
     write('    ...it is over in seconds....'),
     die.

describe(cave) :-
     alive(spider),
     write('There is a giant spider here!  One hairy leg, about the'), 
     write('size of a telephone pole, is directly in front of you!'), 
     write('I would advise you to leave promptly and quietly....'), !.
describe(cave) :-
     write('Yecch!  There is a giant spider here, twitching.').

describe(spider) :-
     alive(spider),
     write('You are on top of a giant spider, standing in a rough'),
     write('mat of coarse hair.  The smell is awful.').

describe(spider) :-
     write('Oh, gross!  You''re on top of a giant dead spider!').
`;const f={name:"app",data(){return{intervalDungeonMessages:null,pendingMessages:[],text:"",session:null,participants:[{id:"me",name:"Me",imageUrl:"/histlog//me.png"},{id:"dungeon",name:"Dungeon Master",imageUrl:"/histlog//dungeon_master.png"}],titleImageUrl:"/histlog//spider.png",messageList:[{type:"text",author:"dungeon",data:{text:"Escribe el comando \n`start.` \npara comenzar tu aventura. No olvides de poner un punto al final de cada comando, sino invalidaré tu comando 😛."}}],newMessagesCount:0,isChatOpen:!1,showTypingIndicator:"",colors:{header:{bg:"hsla(100, 100%, 48%, 0.10)",text:"#ffffff"},launcher:{bg:"hsla(170, 100%, 18%, 0.37)"},messageList:{bg:"#ffffff00"},sentMessage:{bg:"rgb(42 145 0 / 40%)",text:"#ffffff"},receivedMessage:{bg:"#eaeaea",text:"#222222"},userInput:{bg:"#f4f7f9",text:"#565867"}},alwaysScrollToBottom:!1,messageStyling:!0}},mounted(){this.session=pl.create(),this.session.consult(m,{success:function(){},error:function(e){printChat("Comando inválido 😛",e)}}),printChat=e=>{this.pendingMessages.push(e)},this.intervalDungeonMessages=setInterval(()=>{if(this.pendingMessages.length!=0){if(this.showTypingIndicator==""){this.showTypingIndicator="dungeon";return}this.sendDungeonMessage(this.pendingMessages[0]),this.pendingMessages=this.pendingMessages.slice(1),this.pendingMessages.length>0?this.showTypingIndicator="dungeon":this.showTypingIndicator=""}},700)},unmounted(){clearInterval(this.intervalDungeonMessages)},methods:{execute(e){const a=this.session;a.query(`${e}`,{success:function(i){a.answer({success:function(s){},error:function(s){printChat("Comando inválido 😛",s)},fail:function(s){printChat("Comando inválido 😛",s)},limit:function(){}})},error:function(i){printChat("Comando inválido 😛",i)}})},sendDungeonMessage(e){e.length>0&&(this.newMessagesCount=this.isChatOpen?this.newMessagesCount:this.newMessagesCount+1,this.onMessageWasSent({author:"dungeon",type:"text",data:{text:e}}))},onMessageWasSent(e){this.messageList=[...this.messageList,e],e.author=="me"&&this.execute(e.data.text)},openChat(){this.isChatOpen=!0,this.newMessagesCount=0},closeChat(){this.isChatOpen=!1},handleScrollToTop(){},handleOnType(){},editMessage(e){const a=this.messageList.find(i=>i.id===e.id);a.isEdited=!0,a.data.text=e.data.text}}},_={class:"container",style:{display:"flex",alignItems:"center",height:"600px",justifyContent:"center"}};function b(e,a,i,s,t,n){const d=o("RouterLink"),c=o("beautiful-chat");return g(),p("div",null,[r(d,{class:"close",to:"/"},{default:l(()=>[h("X")]),_:1}),w("div",_,[r(c,{class:"chat",participants:t.participants,titleImageUrl:t.titleImageUrl,onMessageWasSent:n.onMessageWasSent,messageList:t.messageList,newMessagesCount:t.newMessagesCount,isOpen:!0,close:n.closeChat,icons:{},open:n.openChat,showEmoji:!1,showFile:!1,showEdition:!1,showDeletion:!0,showTypingIndicator:t.showTypingIndicator,showLauncher:!1,showCloseButton:!1,colors:t.colors,alwaysScrollToBottom:t.alwaysScrollToBottom,disableUserListToggle:!1,messageStyling:t.messageStyling,onOnType:n.handleOnType,onEdit:n.editMessage,style:{zIndex:10,height:"100%",width:"100%",alignItems:"center",justifyContent:"center",display:"flex",alignItems:"center"}},{header:l(()=>[h(" Spider ")]),_:1},8,["participants","titleImageUrl","onMessageWasSent","messageList","newMessagesCount","close","open","showTypingIndicator","colors","alwaysScrollToBottom","messageStyling","onOnType","onEdit"])])])}const v=u(f,[["render",b],["__scopeId","data-v-d62e1fe1"]]);export{v as default};
