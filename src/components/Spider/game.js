export default `

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
`;
