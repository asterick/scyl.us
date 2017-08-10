import MIPS from "./mips";
import GPU from "./gpu";

import { Exceptions } from "./mips/consts";

export default class extends MIPS {
	constructor (bios) {
		super();

		this._gpu = new GPU(this);
		this.tick = this.tick.bind(this);
	}

	start () {
		if (this.running) return ;

		this._adjust_clock = +new Date();
		this.running = true;
		this.tick();
	}

	stop () {
		this.running = false;
	}

	tick () {
		const newClock = +new Date();
		const cycles = newClock - this._adjust_clock;
		this._adjust_clock = newClock;

		if (this.running && this._tick(cycles)) {
			// Schedule next tick when the CPU is free
			setTimeout(this.tick, 0);
		}
	}

	attach (canvas) {
		this._gpu.attach(canvas);
	}

	resize () {
		this._gpu.resize();
	}

	blockSize(address) {
		if (address >= 0x1FC00000 && address < 0x1FC80000) {
			return this._rom.length;
		}

		// Use the default page size
	}

	read (code, address) {
		if (address < 0x400000) {
			return this._ram[address >>> 2];
		}
		else if (address >= 0x1FC00000 && address < 0x1FC80000) {
			return this._rom[(address >>> 2) & 0x1FFFF];
		}

		throw code ? Exceptions.BusErrorInstruction : Exceptions.BusErrorData;
	}

	write (address, value, mask = ~0) {
		if (address < 0x400000) {
			address >>= 2;
			this._ram[address] = (this._ram[address] & ~mask) | (value & mask);
		} else if (address >= 0x1FC00000 && address < 0x1FC80000) {
			// This is rom
		} else {
			throw Exceptions.BusErrorData;
		}
	}
}
