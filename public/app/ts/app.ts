/// <reference path="../../components/phaser/typescript/phaser.d.ts" />
/// <reference path="../../components/phaser/typescript/pixi.d.ts" />

var game = new Phaser.Game(800, 400, Phaser.AUTO, 'survidle');

game.state.add('Boot', Survidle.Scene.Boot, true);
