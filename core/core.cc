#define EXTERN

#include <stdint.h>

#include "compiler.h"
#include "imports.h"

#include "cop0.h"
#include "memory.h"

#include "registers.h"

const MemoryRegion memory_regions[] = {
    { "boot",  ROM_BASE, ROM_SIZE, rom, FLAG_R },
    { "m_ram", RAM_BASE, RAM_SIZE, ram, FLAG_R | FLAG_W | FLAG_LAST },
};

static const int32_t MAX_CLOCK_LAG = 60000;
typedef void (*exec_block)();

// *******
// ** Insertion point
// *******

EXPORT void reset() {
    setRegisterSpace(&registers);
    setMemoryRegions(&memory_regions);

    registers.pc = 0xBFC00000;
    registers.clocks = 0;

    COP0::reset();
}

// *******
// ** Interface helpers
// *******

// This is a template function for executing
EXPORT void execute_call(uint32_t start, uint32_t length) {
    while (registers.clocks > 0) {
        uint32_t index = ((registers.start_pc = registers.pc) - start) >> 2;

        if (index >= length) return ;

        exec_block target = (exec_block) index;

        //target();
    }
}

EXPORT void finalize_call(uint32_t end) {
    registers.pc = end;
    registers.clocks -= (end - registers.start_pc) >> 2;
}

EXPORT void adjust_clock(uint32_t end) {
    registers.clocks -= (end - registers.start_pc) >> 2;
}
