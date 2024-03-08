# Cellular Automata

## What is this?
A collection of [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton) scripts I wrote in JavaScript. A type of abstract model that can be represented by using a two-dimensional grid containing "cells" that have a finite state. Each state changing over time (defined as a "turn" or "generation") according to a defined ruleset.

## Why?
I wanted to get better at writing scripts in JavaScript but could not think of a "fun project" to work towards. A friend of mine showed me a 2D simulation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life). It reminded me a lot of single celled amoeba moving around if you've ever observed them through a microscope. He then told me to implement it myself. It was pretty challenging because I was being introduced to new concepts such as using a [Game Loop](https://gameprogrammingpatterns.com/game-loop.html#the-pattern) to facilitate animation, writing algorithms to check the state of a neighboring cell and learning how to draw graphics to a screen in a browser using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). After many hours of going through implementations by other individuals and cobbling together small working code, I have successfully written my own implementations.

## How to install and run (locally)
1. Clone the project `git clone https://github.com/Captain-Chen/cellular-automata.git`
2. Navigate to one of the project folders and run the `index.html` folder.
3. Follow any instructions outlined in the README or on the page itself.

## Implementations of Cellular Automata
* [Game of Life](/game-of-life/)
* [Langton's Ant](/langtons-ant/)
* [Elementary Cellular Automata](/elementary/)