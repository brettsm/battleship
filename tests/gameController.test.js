import { GameController } from "../src/app/gameController.js";
import { UserInterface } from '../src/ui/ui.js';
import { Player } from '../src/domain/player.js';
import { Gameboard } from '../src/domain/gameboard.js';

describe('game controller properties', () => {
    test('takes all parameters', () => {
        const appRoot = 0;
        expect(new GameController(new Player(new Gameboard(), 'brett'), new Player(new Gameboard()), new UserInterface(appRoot))).toBeDefined();
    });
});