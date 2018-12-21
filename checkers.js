const ANIM_SPEED = 0.5;

class Gameboard {
    constructor(pieces) {
        this.html = $('<div class="gameboard"></div>');

        for (let i = 0; i < pieces.length; i++) {
            this.html.append(pieces[i].html);
            pieces[i].run(ANIM_SPEED);
        }
    }
}

class Gamepiece {
    constructor(position, movements, color = 'black') {
        this.color = color;
        this.position = position;
        this.movements = movements;

        this.html = $('<div class="gamepiece"></div>');
        this.html.addClass(color);
    }

    static fullBoard(frames, exceptions) {
        let result = [];

        for (let i = 1; i <= 12; i++) {
            if (!exceptions.includes(i))
                result.push(new Gamepiece(i, Array(frames).fill(i), 'black'))
        }

        for (let i = 21; i <= 32; i++) {
            if (!exceptions.includes(i))
                result.push(new Gamepiece(i, Array(frames).fill(i), 'white'))
        }

        return result;
    }

    run(speed, delay = 0) {
        setTimeout(() => {
            this._setOffset(this.position);
            let offset0 = this._getOffset(this.position);

            this.html.css({
                top: offset0.top + 'px',
                left: offset0.left + 'px',
                opacity: 1
            });

            for (let i = 0; i < this.movements.length; i++) {
                let offset = this._getOffset(this.movements[i]);

                let callback = i === this.movements.length - 1 ? () => {
                    this.run(speed, 1000);
                } : () => {
                };

                if (this.movements[i] === -1) {
                    this.html.animate({
                        opacity: 0
                    }, 1000 * speed, callback);
                }
                else {
                    this.html.animate({
                        top: offset.top + 'px',
                        left: offset.left + 'px'
                    }, 1000 * speed, callback);
                }
            }
        }, delay);
    }

    _getOffset(position) {
        let width = this.html.width();
        let height = this.html.height();

        position--;

        let y = Math.floor(position / 4);
        let x = position % 4;

        if (y % 2 === 0) {
            x += 0.5;
        }

        return {top: y * height, left: x * width * 2};
    }

    _setOffset(position) {
        let width = this.html.width();
        let height = this.html.height();

        position--;

        let y = Math.floor(position / 4);
        let x = position % 4;

        if (y % 2 === 0) {
            x += 0.5;
        }

        this.html.css('left', (x * width * 2) + 'px');
        this.html.css('top', (y * height) + 'px');
    }
}