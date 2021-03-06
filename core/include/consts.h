#pragma once

static const int REGS_RA = 31;

enum SystemException {
	EXCEPTION_INTERRUPT = 0x00,
	EXCEPTION_TLBMOD = 0x01,
	EXCEPTION_TLBLOAD = 0x02,
	EXCEPTION_TLBSTORE = 0x03,
	EXCEPTION_ADDRESSLOAD = 0x04,
	EXCEPTION_ADDRESSSTORE = 0x05,
	EXCEPTION_BUSERRORINSTRUCTION = 0x06,
	EXCEPTION_BUSERRORDATA = 0x07,
	EXCEPTION_SYSCALL = 0x08,
	EXCEPTION_BREAKPOINT = 0x09,
	EXCEPTION_RESERVEDINSTRUCTION = 0x0A,
	EXCEPTION_COPROCESSORUNUSABLE = 0x0B,
	EXCEPTION_OVERFLOW = 0x0C,
	EXCEPTION_TLBFAILURE = 0xD,

	EXCEPTION_NONE = -1,
	EXCEPTION_GENERAL = -2,
};
