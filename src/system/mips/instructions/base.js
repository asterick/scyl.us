import * as COP0 from "./cop0";
import { block, read, write, exception, REGS, CALLS, LOCAL_VARS } from "./wast";
import * as Consts from "../consts";

/******
 ** Trap Instructions
 ******/

function ReservedInstruction(fields, pc, delayed, delay, escape) {
    return exception(Consts.Exceptions.ReservedInstruction, pc, delayed);
}
ReservedInstruction.assembly = (fields, pc) => `---`;

function CopUnusable(fields, pc, delayed, delay, escape) {
    return exception(Consts.Exceptions.CoprocessorUnusable, pc, delayed, fields.cop);
}
CopUnusable.assembly = (fields, pc) => `COP${fields.cop}\tunusable`;

/******
 ** Load/Store instructions
 ******/

function LB(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },

        { op: "i32.const", value: 24 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "i32.sub" },
        { op: "i32.shl" },
        { op: "i32.const", value: 24 },
        { op: "i32.shr_s" },

        ... write(fields.rt)
    ];
}
LB.assembly = (fields, pc) => `lb\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LBU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },

        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "i32.shl" },

        { op: "i32.const", value: 0xFF },
        { op: "i32.and" },
        ... write(fields.rt)
    ];
}
LBU.assembly = (fields, pc) => `lbu\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LH(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },

        { op: "i32.const", value: 1 },
        { op: "i32.and" },

        { op: "if", block: block(exception(Consts.Exceptions.AddressLoad, pc, delayed)) },

        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },

        { op: "i32.const", value: 16 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 2 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },

        { op: "i32.sub" },
        { op: "i32.shl" },
        { op: "i32.const", value: 16 },
        { op: "i32.shr_s" },

        ... write(fields.rt)
    ];
}
LH.assembly = (fields, pc) => `lh\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LHU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 1 },
        { op: "i32.and" },
        { op: "if", block: block(exception(Consts.Exceptions.AddressLoad, pc, delayed)) },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 2 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "i32.shl" },
        { op: "i32.const", value: 0xFFFF },
        { op: "i32.and" },
        ... write(fields.rt)
    ];
}
LHU.assembly = (fields, pc) => `lhu\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LW(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "if", block: block(exception(Consts.Exceptions.AddressLoad, pc, delayed)) },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },
        ... write(fields.rt)
    ];
}
LW.assembly = (fields, pc) => `lw\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function SB(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        ... read(fields.rt),
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        { op: "i32.const", value: 0xFF },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.STORE },
    ]
}
SB.assembly = (fields, pc) => `sb\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function SH(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 1 },
        { op: "i32.and" },
        { op: "if", block: block(exception(Consts.Exceptions.AddressStore, pc, delayed)) },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... read(fields.rt),
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        { op: "i32.const", value: 0xFFFF },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.STORE }
    ]
}
SH.assembly = (fields, pc) => `sh\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function SW(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "if", block: block(exception(Consts.Exceptions.AddressStore, pc, delayed)) },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... read(fields.rt),
        { op: "i32.const", value: -1 },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.STORE }
    ]
}
SW.assembly = (fields, pc) => `sw\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LWR(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },

        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },

        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shr_u" },

        ... read(fields.rt),

        { op: "i32.const", value: -1 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shr_u" },
        { op: "i32.const", value: -1 },
        { op: "i32.xor" },
        { op: "i32.and" },

        { op: "i32.or" },
        ... write(fields.rt)
    ];
}

LWR.assembly = (fields, pc) => `lwr\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function LWL(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },

        { op: 'i32.const', value: 3 },
        { op: "i32.eq" },
        { op: "br_if", relative_depth: 0 },

        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.LOAD },

        { op: "i32.const", value: 32 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 1 },
        { op: "i32.add" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.sub" },
        { op: "i32.shl" },


        { op: "i32.const", value: -1 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shr_u" },
        ... read(fields.rt),
        { op: "i32.and" },
        { op: "i32.or" },
        ... write(fields.rt)
    ];
}
LWL.assembly = (fields, pc) => `lwl\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function SWR(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        ... read(fields.rt),
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        { op: "i32.const", value: -1 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shl" },
        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.STORE }
    ]
}
SWR.assembly = (fields, pc) => `swr\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

function SWL(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.add" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },

        { op: 'i32.const', value: 3 },
        { op: "i32.eq" },
        { op: "br_if", relative_depth: 0 },

        { op: "get_local", index: LOCAL_VARS.I32_TEMP },

        ... read(fields.rt),
        { op: "i32.const", value: 32 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.const", value: 3 },
        { op: "i32.and" },
        { op: "i32.const", value: 1 },
        { op: "i32.add" },
        { op: "i32.const", value: 8 },
        { op: "i32.mul" },
        { op: "i32.sub" },
        { op: "tee_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shr_u" },

        { op: "i32.const", value: -1 },
        { op: "get_local", index: LOCAL_VARS.I32_TEMP },
        { op: "i32.shr_u" },

        ... pc,
        ... delayed,
        { op: "call", function_index: CALLS.STORE }
    ];
}
SWL.assembly = (fields, pc) => `swl\t${Consts.Registers[fields.rt]}, ${fields.imm16}(${Consts.Registers[fields.rs]})`

/******
 ** Arithmatic instructions
 ******/

function ADD(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i64.extend_s/i32" },
        ... read(fields.rt),
        { op: "i64.extend_s/i32" },
        { op: "i64.add" },

        { op: "tee_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: -0x80000000 },
        { op: "i64.lt_s" },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: 0x80000000 },
        { op: "i64.ge_s" },

        { op: "i32.or" },
        { op: "if", block: block(exception(Consts.Exceptions.Overflow, pc, delayed)) },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i32.wrap/i64" },
        ... write(fields.rd)
    ]
}
ADD.assembly = (fields, pc) => fields.rd ? `add\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function ADDU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.add" },
        ... write(fields.rd)
    ]
}
ADDU.assembly = (fields, pc) => fields.rd ? `addu\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function SUB(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i64.extend_s/i32" },
        ... read(fields.rt),
        { op: "i64.extend_s/i32" },
        { op: "i64.sub" },

        { op: "tee_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: -0x80000000 },
        { op: "i64.lt_s" },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: 0x80000000 },
        { op: "i64.ge_s" },

        { op: "i32.or" },
        { op: "if", block: block(exception(Consts.Exceptions.Overflow, pc, delayed)) },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i32.wrap/i64" },
        ... write(fields.rd)
    ]}
SUB.assembly = (fields, pc) => fields.rd ? `sub\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function SUBU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.sub" },
        ... write(fields.rd)
    ]
}
SUBU.assembly = (fields, pc) => fields.rd ? `subu\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function ADDI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i64.extend_s/i32" },
        ... fields.simm16,
        { op: "i64.extend_s/i32" },
        { op: "i64.add" },

        { op: "tee_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: -0x80000000 },
        { op: "i64.lt_s" },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: 0x80000000 },
        { op: "i64.ge_s" },

        { op: "i32.or" },
        { op: "if", block: block(exception(Consts.Exceptions.Overflow, pc, delayed)) },

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i32.wrap/i64" },
        ... write(fields.rt)
    ]
}
ADDI.assembly = (fields, pc) => fields.rt ? `addi\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, ${fields.simm16}` : "nop";

function ADDIU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.simm16,
        { op: "i32.add" },
        ... write(fields.rt)
    ];
}

ADDIU.assembly = (fields, pc) => fields.rt ? `addiu\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, ${fields.simm16}` : "nop";

/******
 ** Comparison instructions
 ******/
function SLT(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: 'i32.lt_s'},
        ... write(fields.rd)
    ];
}
SLT.assembly = (fields, pc) => `slt\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function SLTU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: 'i32.lt_u'},
        ... write(fields.rd)
    ];
}
SLTU.assembly = (fields, pc) => `sltu\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function SLTI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.simm16,
        { op: 'i32.lt_s'},
        ... write(fields.rt)
    ]
}
SLTI.assembly = (fields, pc) => `slti\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, ${fields.simm16}`;

function SLTIU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.simm16,
        { op: 'i32.lt_u'},
        ... write(fields.rt)
    ]
}
SLTIU.assembly = (fields, pc) => `sltiu\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, $${(fields.simm16 >>> 0).toString(16)}`;

/******
 ** Logical instructions
 ******/

function AND(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.and" },
        ... write(fields.rd)
    ]
}
AND.assembly = (fields, pc) => fields.rd ? `and\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function OR(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.or" },
        ... write(fields.rd)
    ]
}
OR.assembly = (fields, pc) => fields.rd ? `or\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function XOR(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.xor" },
        ... write(fields.rd)
    ]
}
XOR.assembly = (fields, pc) => fields.rd ? `xor\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function NOR(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: "i32.or" },
        { op: "i32.const", value: -1 },
        { op: "i32.xor" },
        ... write(fields.rd)
    ]
}
NOR.assembly = (fields, pc) => fields.rd ? `nor\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function ANDI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.and" },
        ... write(fields.rt)
    ]
}
ANDI.assembly = (fields, pc) => fields.rt ? `andi\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, $${fields.imm16.toString(16)}` : "nop";

function ORI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.or" },
        ... write(fields.rt)
    ]
}
ORI.assembly = (fields, pc) => fields.rt ? `ori\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, $${fields.imm16.toString(16)}` : "nop";

function XORI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... fields.imm16,
        { op: "i32.xor" },
        ... write(fields.rt)
    ]
}
XORI.assembly = (fields, pc) => fields.rt ? `xori\t${Consts.Registers[fields.rt]}, ${Consts.Registers[fields.rs]}, $${fields.imm16.toString(16)}` : "nop";

/******
 ** Shift instructions
 ******/

function SLLV(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... read(fields.rs),
        { op: "i32.const", value: 0x1F },
        { op: "i32.and" },
        { op: "i32.shl" },
        ... write(fields.rd)
    ]
}
SLLV.assembly = (fields, pc) => fields.rd ? `sllv\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function SRLV(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... read(fields.rs),
        { op: "i32.const", value: 0x1F },
        { op: "i32.and" },
        { op: "i32.shr_u" },
        ... write(fields.rd)
    ]
}
SRLV.assembly = (fields, pc) => fields.rd ? `srlv\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function SRAV(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... read(fields.rs),
        { op: "i32.const", value: 0x1F },
        { op: "i32.and" },
        { op: "i32.shr_s" },
        ... write(fields.rd)
    ]
}
SRAV.assembly = (fields, pc) => fields.rd ? `srav\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}` : "nop";

function SLL(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... fields.shamt,
        { op: "i32.shl" },
        ... write(fields.rd)
    ]
}
SLL.assembly = (fields, pc) => fields.rd ? `sll\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rt]}, ${fields.shamt}` : "nop";

function SRL(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... fields.shamt,
        { op: "i32.shr_u" },
        ... write(fields.rd)
    ]
}
SRL.assembly = (fields, pc) => fields.rd ? `srl\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rt]}, ${fields.shamt}` : "nop";

function SRA(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        ... fields.shamt,
        { op: "i32.shr_s" },
        ... write(fields.rd)
    ]
}
SRA.assembly = (fields, pc) => fields.rd ? `sra\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rt]}, ${fields.shamt}` : "nop";

function LUI(fields, pc, delayed, delay, escape) {
    return [
        ... fields.imm16,
        { op: "i32.const", value: 16 },
        { op: "i32.shl" },
        ... write(fields.rt)
    ]
}
LUI.assembly = (fields, pc) => `lui\t${Consts.Registers[fields.rt]}, $${fields.imm16.toString(16)}`;

/******
 ** Multiply/Divide instructions
 ******/
function MULT(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i64.extend_s/i32" },
        ... read(fields.rt),
        { op: "i64.extend_s/i32" },
        { op: "i64.mul" },

        { op: "tee_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i32.wrap/i64" },
        ... write(REGS.LO),

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: 32 },
        { op: "i64.shr_u" },
        { op: "i32.wrap/i64" },
        ... write(REGS.HI)
    ]
}
MULT.assembly = (fields, pc) => `mult\t${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function MULTU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i64.extend_u/i32" },
        ... read(fields.rt),
        { op: "i64.extend_u/i32" },
        { op: "i64.mul" },

        { op: "tee_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i32.wrap/i64" },
        ... write(REGS.LO),

        { op: "get_local", index: LOCAL_VARS.I64_TEMP },
        { op: "i64.const", value: 32 },
        { op: "i64.shr_u" },
        { op: "i32.wrap/i64" },
        ... write(REGS.HI)
    ]
}
MULTU.assembly = (fields, pc) => `multu\t${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function DIV(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: "i32.const", value: -0x80000000 },
        { op: "i32.eq" },
        ... read(fields.rt),
        { op: "i32.const", value: -1 },
        { op: "i32.eq" },
        { op: "i32.and" },
        { op: "if", block: block([
            { op: "i32.const", value: -0x80000000 },
            ... write(REGS.HI),
            { op: "i32.const", value: 0 },
            ... write(REGS.LO),
        { op: "else" },
        ... read(fields.rt),
        { op: "i32.eqz" },
        { op: "if", block: block([
            ... read(fields.rs),
            ... write(REGS.HI),

            ... read(fields.rs),
            { op: "i32.const", value: -1 },
            { op: "i32.xor"},
            { op: "i32.const", value: 31 },
            { op: "i32.shr_s"},
            ... write(REGS.LO),

        { op: "else" },
            ... read(fields.rs),
            ... read(fields.rt),
            { op: "i32.rem_s"},
            ... write(REGS.HI),
            ... read(fields.rs),
            ... read(fields.rt),
            { op: "i32.div_s"},
            ... write(REGS.LO),
        ])}
        ])}
    ]
}
DIV.assembly = (fields, pc) => `div\t${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function DIVU(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rt),
        { op: "i32.eqz" },
        { op: "if", block: block([
            ... read(fields.rs),
            ... write(REGS.HI),
            { op: "i32.const", value: -1 },
            ... write(REGS.LO),
        { op: "else" },
            ... read(fields.rs),
            ... read(fields.rt),
            { op: "i32.rem_u"},
            ... write(REGS.HI),
            ... read(fields.rs),
            ... read(fields.rt),
            { op: "i32.div_u"},
            ... write(REGS.LO),
        ])}
    ]
}
DIVU.assembly = (fields, pc) => `divu\t${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}`;

function MFHI(fields, pc, delayed, delay, escape) {
    return [
        ... read(REGS.HI),
        ... write(fields.rd)
    ];
}
MFHI.assembly = (fields, pc) => `mfhi\t${Consts.Registers[fields.rd]}`;

function MFLO(fields, pc, delayed, delay, escape) {
    return [
        ... read(REGS.LO),
        ... write(fields.rd)
    ];
}
MFLO.assembly = (fields, pc) => `mflo\t${Consts.Registers[fields.rd]}`;

function MTHI(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... write(REGS.HI)
    ];
}
MTHI.assembly = (fields, pc) => `mthi\t${Consts.Registers[fields.rs]}`;

function MTLO(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... write(REGS.LO)
    ];
}
MTLO.assembly = (fields, pc) => `mtlo\t${Consts.Registers[fields.rs]}`;

/******
 ** Branching instructions
 ******/

function J(fields, pc, delayed, delay, escape) {
    return [
        ... delay(),

        ... pc,
        { op: 'i32.const', value: 0xF0000000 >> 0 },
        { op: 'i32.and'},
        ... fields.imm26,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul'},
        { op: 'i32.or'},

        ... write(REGS.PC),
        ... escape
    ];
}
J.assembly = (fields, pc) => `j\t$${(((pc & 0xF0000000) | (fields.imm26 * 4)) >>> 0).toString(16)}`;

function JAL(fields, pc, delayed, delay, escape) {
    return [
        ... delay(),
        ... pc,
        { op: 'i32.const', value: 8 },
        { op: 'i32.add' },
        ... write(31),
        ... pc,
        { op: 'i32.const', value: 0xF0000000 >> 0 },
        { op: 'i32.and'},
        ... fields.imm26,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul'},
        { op: 'i32.or'},
        ... write(REGS.PC),
        ... escape
    ];
}
JAL.assembly = (fields, pc) => `jal\t$${(((pc & 0xF0000000) | (fields.imm26 * 4)) >>> 0).toString(16)}`;

function JR(fields, pc, delayed, delay, escape) {
    return [
        ... delay(),
        ... read(fields.rs),
        { op: 'i32.const', value: 0xFFFFFFFC >> 0 },
        { op: 'i32.and' },
        ... write(REGS.PC),
        ... escape
    ];
}
JR.assembly = (fields, pc) => `jr\t${Consts.Registers[fields.rs]}`;

function JALR(fields, pc, delayed, delay, escape) {
    return [
        ... delay(),
        ... pc,
        { op: 'i32.const', value: 8 },
        { op: 'i32.add' },
        ... write(fields.rd),
        ... read(fields.rs),
        { op: 'i32.const', value: 0xFFFFFFFC >> 0 },
        { op: 'i32.and' },
        ... write(REGS.PC),
        ... escape
    ];
}
JALR.assembly = (fields, pc) => `jalr\t${Consts.Registers[fields.rd]}, ${Consts.Registers[fields.rs]}`;

function BEQ(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: 'i32.eq' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BEQ.assembly = (fields, pc) => `beq\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BNE(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        ... read(fields.rt),
        { op: 'i32.eq' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),

        ... escape
    ];
}
BNE.assembly = (fields, pc) => `bne\t${Consts.Registers[fields.rs]}, ${Consts.Registers[fields.rt]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BLTZ(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: 'i32.const', value: 0 },
        { op: 'i32.ge_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BLTZ.assembly = (fields, pc) => `bltz\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BGEZ(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: 'i32.const', value: 0 },
        { op: 'i32.lt_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BGEZ.assembly = (fields, pc) => `bgez\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BGTZ(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: 'i32.const', value: 0 },
        { op: 'i32.le_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BGTZ.assembly = (fields, pc) => `bgtz\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BLEZ(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: 'i32.const', value: 0 },
        { op: 'i32.gt_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),

        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },

        ... write(REGS.PC),
        ... escape
    ];
}
BLEZ.assembly = (fields, pc) => `blez\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BLTZAL(fields, pc, delayed, delay, escape) {
    return [
        ... read(fields.rs),
        { op: 'i32.const', value: 0 },
        { op: 'i32.ge_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),
        ... pc,
        { op: 'i32.const', value: 8 },
        { op: 'i32.add' },
        ... write(31),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BLTZAL.assembly = (fields, pc) => `bltzal\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function BGEZAL(fields, pc, delayed, delay, escape) {
    return [
        { op: 'i32.const', value: 0 },
        ... read(fields.rs),
        { op: 'i32.lt_s' },
        { op: 'br_if', relative_depth: 0 },

        ... delay(),

        ... pc,
        { op: 'i32.const', value: 8 },
        { op: 'i32.add' },

        ... write(31),
        ... fields.simm16,
        { op: 'i32.const', value: 4 },
        { op: 'i32.mul' },
        ... pc,
        { op: 'i32.const', value: 4 },
        { op: 'i32.add' },
        { op: 'i32.add' },
        ... write(REGS.PC),
        ... escape
    ];
}
BGEZAL.assembly = (fields, pc) => `bgezal\t${Consts.Registers[fields.rs]}, $${((pc + 4) + (fields.simm16 * 4)).toString(16)}`;

function SYSCALL(fields, pc, delayed, delay, escape) {
    return exception(Consts.Exceptions.SysCall, pc, delayed);
}
SYSCALL.assembly = (fields, pc) => `syscall\t$${fields.imm20.toString(16)}`;

function BREAK(fields, pc, delayed, delay, escape) {
    return exception(Consts.Exceptions.Breakpoint, pc, delayed);
}
BREAK.assembly = (fields, pc) => `break\t$${fields.imm20.toString(16)}`;

export default {
    field: "opcode",
    fallback: ReservedInstruction,
    0x00: {
        field: "funct",
        0x00: SLL,
        0x02: SRL,
        0x03: SRA,
        0x04: SLLV,
        0x06: SRLV,
        0x07: SRAV,
        0x08: JR,
        0x09: JALR,
        0x0C: SYSCALL,
        0x0D: BREAK,
        0x10: MFHI,
        0x11: MTHI,
        0x12: MFLO,
        0x13: MTLO,
        0x18: MULT,
        0x19: MULTU,
        0x1A: DIV,
        0x1B: DIVU,
        0x20: ADD,
        0x21: ADDU,
        0x22: SUB,
        0x23: SUBU,
        0x24: AND,
        0x25: OR,
        0x26: XOR,
        0x27: NOR,
        0x2A: SLT,
        0x2B: SLTU
    },
    0x01: {
        field: "rt",
        0x00: BLTZ,
        0x01: BGEZ,
        0x10: BLTZAL,
        0x11: BGEZAL
    },
    0x02: J,
    0x03: JAL,
    0x04: BEQ,
    0x05: BNE,
    0x06: BLEZ,
    0x07: BGTZ,
    0x08: ADDI,
    0x09: ADDIU,
    0x0A: SLTI,
    0x0B: SLTIU,
    0x0C: ANDI,
    0x0D: ORI,
    0x0E: XORI,
    0x0F: LUI,
    0x10: COP0.default,
    0x11: CopUnusable,
    0x13: CopUnusable,
    0x13: CopUnusable,
    0x20: LB,
    0x21: LH,
    0x22: LWL,
    0x23: LW,
    0x24: LBU,
    0x25: LHU,
    0x26: LWR,
    0x28: SB,
    0x29: SH,
    0x2A: SWL,
    0x2B: SW,
    0x2E: SWR,
    0x30: COP0.LWC0,
    0x31: CopUnusable,
    0x13: CopUnusable,
    0x33: CopUnusable,
    0x38: COP0.SWC0,
    0x39: CopUnusable,
    0x13: CopUnusable,
    0x3B: CopUnusable
};
