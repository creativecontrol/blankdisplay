/**
 * blankdisplay
 */

class Nothing {

    constructor() {
        this.watcher;
        this.welcome = document.querySelector('#welcome');
        this.help = document.querySelector('#help-button');
        this.helpDialog = document.querySelector('#help-dialog');
        this.searchParams = new URLSearchParams(window.location.search);

        this.init();
        
    }

    init() {
        this.checkWelcome();
        this.checkCursor();
        this.checkBackgroundColor();
        
        this.setListeners();
    }

    setListeners() {
        this.help.onclick = () => {
            this.helpDialog.showModal();
        }

    }

    checkWelcome() {
        if (!this.searchParams.has('noWelcome')) {
            this.welcome.style.display = 'block';
            setTimeout(() => {
                this.hideWelcome();
            }, 1000);
        };
    }

    hideWelcome() {
        document.querySelector('#welcome').classList.add('peekaboo');
    }

    checkCursor() {
        if (this.searchParams.has('noCursor')) {
            document.body.style.cursor = 'none';
        } else {
            this.cursorAutoHide();
        }

    }

    cursorAutoHide() {
        var timeout = () => {
            document.body.style.cursor = 'none';
        }
        this.watcher = setTimeout(timeout, 2000);
        window.onmousemove = () => {
            clearTimeout(this.watcher);
            document.body.style.cursor = 'auto';
            this.watcher = setTimeout(timeout, 2000);
        };
    }

    checkBackgroundColor() {
        console.debug(this.searchParams.toString());
        if (this.searchParams.has('color')) {
            this.setBackgroundColor(this.searchParams.get('color'));
        }
    }

    setBackgroundColor(color) {
        let newColor = color;

        const shortHex = /(?=^#)*[0-9A-Fa-f]{3}/;
        const regularHex = /(?=^#)*[0-9A-Fa-f]{6}/;
        const hexCheck = /^#/;

        if (newColor.length < 6) {
            newColor = extendHex(newColor);
        }

        if (regularHex.test(newColor)) {
            if (!hexCheck.test(newColor)) {
                newColor = '#' + newColor;
                console.debug('new color', newColor);
            } 

            document.body.style.backgroundColor = newColor;

            this.setTheme(newColor.replace('#', ''));
        }
       else {
            console.log('Not a valid hex parameter');
        }
        
    }

    setTheme(textColor) {
        console.debug(`color math ${textColor} > 0x888888 = ${parseInt(textColor, 16) >= 0x888888}`);
        if (parseInt(textColor, 16) >= 0x888888) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }
}



window.onload = () => {
    window.app = new Nothing();
    window.app.init();
}