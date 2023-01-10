import{_ as g,r as i,o as p,c as m,a as r,w as c,b as h,d as l}from"./index-d567e112.js";const _=`

:- dynamic([at/2,estoy_en/1,vivo/1]).
:- retractall(at(_, _)), retractall(estoy_en(_)), retractall(vivo(_)).

estoy_en(prado).

camino(arana, d, cueva).
camino(cueva, u, arana).
camino(cueva, w, entrada_de_la_cueva).
camino(entrada_de_la_cueva, e, cueva).
camino(entrada_de_la_cueva, s, prado).

camino(prado, n, entrada_de_la_cueva) :- at(linterna, en_las_manos).
camino(prado, n, entrada_de_la_cueva) :-
     write('¿Entrando a la cueva oscura sin luz?'),
     write('¿Estás bien de la cabeza?'), 
     !, fail.

camino(prado, s, edificio).

camino(edificio, n, prado).
camino(edificio, w, jaula).

camino(jaula, e, edificio).

camino(bloqueado, w, edificio).

camino(edificio, e, bloqueado) :- at(llave, en_las_manos).
camino(edificio, e, bloqueado) :-
     write('La puerta parece estar cerrada.'),
     fail.

at(ruby, arana).
at(llave, entrada_de_la_cueva).
at(linterna, edificio).
at(espada, bloqueado).

vivo(arana).

tomar(X) :-
     at(X, en_las_manos),
     write('!Ya lo tienes en tus manos¡'),
     !.

tomar(X) :-
     estoy_en(Place),
     at(X, Place),
     retract(at(X, Place)),
     assertz(at(X, en_las_manos)),
     write('De acuerdo.'),
     !.

tomar(_) :-
     write('No lo veo aqui.').

soltar(X) :-
     at(X, en_las_manos),
     estoy_en(Place),
     retract(at(X, en_las_manos)),
     assertz(at(X, Place)),
     write('De acuerdo.'),
     !.

soltar(_) :-
     write('You aren''t holding it!').


n :- go(n).

s :- go(s).

e :- go(e).

w :- go(w).

u :- go(u).

d :- go(d).

go(Direccion) :-
     estoy_en(Here),
     camino(Here, Direccion, There),
     retract(estoy_en(Here)),
     assertz(estoy_en(There)),
     observar,
     !.

go(_) :-
     write('You can''t go that way.').

observar :-
     estoy_en(Place),
     describir(Place),
     notice_objects_at(Place).

notice_objects_at(Place) :-
     at(X, Place),
     write('Hay un(a) '), write(X), write(' aqui.'),
     fail.

notice_objects_at(_).

atacar :-
     estoy_en(jaula),
     write('¡Oh, que mal!  Has sido el alimento de un leon.'), 
     !,
     morir.

atacar :-
     estoy_en(cueva),
     write('La pata de araña también es tan dura como un poste de teléfono.').

atacar :-
     estoy_en(arana),
     at(espada, en_las_manos),
     retract(vivo(arana)),
     write('Cortas repetidamente la espalda de la araña. Un viscoso icor sale a borbotones del lomo de la araña y se apodera de ti.'),
     write('Creo que lo has matado, a pesar de los continuos espasmos.'),
      !.

atacar :-
     estoy_en(arana),
     write('Golpear la espalda de la araña con los puños no tiene efecto.').

atacar :-
     write('No veo nada hostil aquí.').

morir :-
     !, terminar.

terminar :-
     write('El juego ha terminado. Por favor, introduzca el comando "halt"'),
     !.

instrucciones :-
     write('Ingrese comandos utilizando la sintaxis estándar de Prolog.'), 
     write('Los comandos disponibles son:'), 
     write('iniciar.                   -- para iniicar el juego.'), 
     write('n.  s.  e.  w.  u.  d.   -- para ir en esa direccion.'), 
     write('tomar(Object).            -- para tomar un objeto.'), 
     write('soltar(Object).            -- para soltar un objeto.'), 
     write('atacar.                    -- para atacar a un enemigo.'), 
     write('observa.                    -- para observar tu alrededor.'), 
     write('instrucciones.            -- para ver nuevamente este mensaje'), 
     write('------').

iniciar :-
     instrucciones,
     observar.

describir(prado) :-
     at(ruby, en_las_manos),
     write('¡¡Felicidades!!'),
     write('Has recuperado el rubí y has ganado la partida.'),  
     terminar, !.

describir(prado) :-
     write('Estás en un prado.'),
     write('Al norte está la oscura entrada de una cueva; al sur hay un pequeño edificio.'),
     write('Tu tarea, si decides aceptarla, es recuperar el famoso rubí de Bar-Abzad y devolverlo a este prado.').

describir(edificio) :-
     write('Estás en un edificio pequeño.'),
     write('La salida es hacia el norte.'),
     write('Hay una puerta con barrotes al oeste, pero parece estar abierta. Hay una puerta más pequeña al este.').

describir(jaula) :-
     write('¡Estás en la guarida de un león! El león tiene un aspecto flaco y hambriento. ¡Será mejor que te vayas de aquí!').


describir(bloqueado) :-
     write('Esto no es más que un viejo armario de almacenamiento.').

describir(entrada_de_la_cueva) :-
     write('Estás en la entrada de una cueva húmeda.'),
     write('La salida es al sur; hay un pasaje grande, oscuro y redondo hacia el este.').

describir(cueva) :-
     vivo(arana),
     at(ruby, en_las_manos),
     write('¡¡¡La araña te ve con el rubí y ataca!!!'), 
     write('  ...se acaba en segundos....  '),
     morir.

describir(cueva) :-
     vivo(arana),
     write('¡Aquí hay una araña gigante!'),
     write('¡Una pierna peluda, del tamaño de un poste de teléfono, está directamente frente a ti!'),
     write('Te aconsejo que te vayas pronto y en silencio....'),
     !.

describir(cueva) :-
     write('¡Diablos! Hay una araña gigante aquí, retorciéndose.').


describir(arana) :-
     vivo(arana),
     write('Estás encima de una araña gigante, de pie sobre una alfombra áspera de pelo áspero. El olor es horrible.').


describir(arana) :-
     write('¡Que, asqueroso! ¡Estás encima del cadaver de una araña gigante!').
`;const w={name:"app",data(){return{intervalDungeonMessages:null,pendingMessages:[],text:"",session:null,participants:[{id:"me",name:"Me",imageUrl:"/histlog//me.png"},{id:"dungeon",name:"Dungeon Master",imageUrl:"/histlog//dungeon_master.png"}],titleImageUrl:"/histlog//spider.png",messageList:[{type:"text",author:"dungeon",data:{text:"Escribe el comando \n`iniciar.` \npara comenzar tu aventura. No olvides de poner un punto al final de cada comando, sino invalidaré tu comando 😛."}}],newMessagesCount:0,isChatOpen:!1,showTypingIndicator:"",colors:{header:{bg:"hsla(100, 100%, 48%, 0.10)",text:"#ffffff"},launcher:{bg:"hsla(170, 100%, 18%, 0.37)"},messageList:{bg:"#ffffff00"},sentMessage:{bg:"rgb(42 145 0 / 40%)",text:"#ffffff"},receivedMessage:{bg:"#eaeaea",text:"#222222"},userInput:{bg:"#f4f7f9",text:"#565867"}},alwaysScrollToBottom:!1,messageStyling:!0}},mounted(){this.session=pl.create(),this.session.consult(_,{success:function(){},error:function(e){printChat("Comando inválido 😛",e)}}),printChat=e=>{this.pendingMessages.push(e)},this.intervalDungeonMessages=setInterval(()=>{if(this.pendingMessages.length!=0){if(this.showTypingIndicator==""){this.showTypingIndicator="dungeon";return}this.sendDungeonMessage(this.pendingMessages[0]),this.pendingMessages=this.pendingMessages.slice(1),this.pendingMessages.length>0?this.showTypingIndicator="dungeon":this.showTypingIndicator=""}},700)},unmounted(){clearInterval(this.intervalDungeonMessages)},methods:{execute(e){const t=this.session;t.query(`${e}`,{success:function(s){t.answer({success:function(n){},error:function(n){printChat("Comando inválido 😛",n)},fail:function(n){printChat("Comando inválido 😛",n)},limit:function(){}})},error:function(s){printChat("Comando inválido 😛",s)}})},sendDungeonMessage(e){e.length>0&&(this.newMessagesCount=this.isChatOpen?this.newMessagesCount:this.newMessagesCount+1,this.onMessageWasSent({author:"dungeon",type:"text",data:{text:e}}))},onMessageWasSent(e){this.messageList=[...this.messageList,e],e.author=="me"&&this.execute(e.data.text)},openChat(){this.isChatOpen=!0,this.newMessagesCount=0},closeChat(){this.isChatOpen=!1},handleScrollToTop(){},handleOnType(){},editMessage(e){const t=this.messageList.find(s=>s.id===e.id);t.isEdited=!0,t.data.text=e.data.text}}},f={class:"container",style:{display:"flex",alignItems:"center",height:"600px",justifyContent:"center"}};function v(e,t,s,n,a,o){const d=i("RouterLink"),u=i("beautiful-chat");return p(),m("div",null,[r(d,{class:"close",to:"/"},{default:c(()=>[l("X")]),_:1}),h("div",f,[r(u,{class:"chat",participants:a.participants,titleImageUrl:a.titleImageUrl,onMessageWasSent:o.onMessageWasSent,messageList:a.messageList,newMessagesCount:a.newMessagesCount,isOpen:!0,close:o.closeChat,icons:{},open:o.openChat,showEmoji:!1,showFile:!1,showEdition:!1,showDeletion:!0,showTypingIndicator:a.showTypingIndicator,showLauncher:!1,showCloseButton:!1,colors:a.colors,alwaysScrollToBottom:a.alwaysScrollToBottom,disableUserListToggle:!1,messageStyling:a.messageStyling,onOnType:o.handleOnType,onEdit:o.editMessage,style:{zIndex:10,height:"100%",width:"100%",alignItems:"center",justifyContent:"center",display:"flex",alignItems:"center"}},{header:c(()=>[l(" Spider ")]),_:1},8,["participants","titleImageUrl","onMessageWasSent","messageList","newMessagesCount","close","open","showTypingIndicator","colors","alwaysScrollToBottom","messageStyling","onOnType","onEdit"])])])}const b=g(w,[["render",v],["__scopeId","data-v-4d9cd7e1"]]);export{b as default};
