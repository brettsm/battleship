import { GameController } from "../src/app/gameController.js";
import { UserInterface } from '../src/ui/ui.js';
import { Player } from '../src/domain/player.js';
import { Gameboard } from '../src/domain/gameboard.js';

describe('game controller properties', () => {
    test('takes all parameters', () => {
        let root = {}
        const game = new GameController(root);
        expect(game).toBeDefined();
    });
});