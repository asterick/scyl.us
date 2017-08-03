import Export from "../../../dynast/export";
import { FieldsWasmDynamic } from "./fields";

export const REGS = {
	LO: 32,
	HI: 33,
	PC: 34,

	INSTRUCTION_WORD: 35,
	INSTRUCTION_PC: 36,
	INSTRUCTION_DELAYED: 37
};

export const CALLS = {
	EXECUTE: 0,
	EXCEPTION: 1,
	LOAD: 2,
	STORE: 3,
	MFC0: 4,
	MTC0: 5,
	RFE: 6,
	TLBR: 7,
	TLBWI: 8,
	TLBWR: 9,
	TLBP: 10,

	EXPORT_BASE_INDEX: 11
};

export const LOCAL_VARS = {
	I64_TEMP: 0,
	I32_TEMP: 1
};

export function block(body) {
	return { type: "null_block", body: body }
}

export function local(index) {
	return [{ op: 'get_local', index }];
}

function indexValue(index) {
	if (index.length > 1 || index[0].type != i32.const) {
		return null;
	}

	return index[0].value;
}

export function read(index) {
	var target = typeof index === "number" ? index : indexValue(index);

	if (target === null) {
		return [
			... index,
			{ op: "i32.const", value: 4 },
			{ op: 'i32.mul' },
			{ op: "i32.load", "flags": 2, "offset": 0 },
			{ op: "i32.const", value: 0 },
			... index,
			{ op: "select" }
		];
	}

	return target ? [
		{ op: 'i32.const', value: target * 4 },
		{ op: "i32.load", "flags": 2, "offset": 0 }
	] : [
		{ op: 'i32.const', value: 0 }
	];
}

export function write(index, value) {
	if (value === undefined) throw null;

	var target = typeof index === "number" ? index : indexValue(index);

	if (target === null) {
		return [
			{ op: 'i32.const', value: 0 },
			... index,
			{ op: 'i32.eqz' },
			{ op: 'select' },

			... index,
			{ op: "i32.const", value: 4 },
			{ op: 'i32.mul' },
			... value,
			{ op: "i32.store", "flags": 2, "offset": 0 },
		];
	}

	return target ? [
		{ op: 'i32.const', value: target * 4 },
		... value,
		{ op: "i32.store", "flags": 2, "offset": 0 }
	] : [
		... value,
		{ op: "drop" }
	];
}

export function exception(code, pc, delayed, cop = [{ op: 'i32.const', value: 0 }] ) {
	return [
		{ op: 'i32.const', value: code },
        ... pc,
        ... delayed,
        ... cop,
        { op: "call", function_index: CALLS.EXCEPTION },
        { op: "unreachable" }
	]
}

export function dynamicCall(func) {
	return {
            "locals": [
        		{
        			count: 1,
        			type: 'i64'
        		},
        		{
        			count: 1,
        			type: 'i32'
        		}
            ],
            "type": {
                "type": "func_type",
                "parameters": [],
                "returns": []
            },
            "code": [
				{ op: 'block', block:
					block(func(
						FieldsWasmDynamic,
						read(REGS.INSTRUCTION_PC),
						read(REGS.INSTRUCTION_DELAYED),
						() => [
							... read(REGS.INSTRUCTION_PC),
							{ op: 'i32.const', value: 4 },
							{ op: 'i32.add' },
					        { op: "call", function_index: CALLS.EXECUTE },
						],
						[{ op: 'return' }]
					))
				}
			]
        };
}

export function module(functions) {
	const result = {
	    "magicNumber": 1836278016,
	    "version": 1,
	    "export_section": [],
	    "function_section": [],
	    "import_section": [
			{
	            "module": "processor",
	            "field": "memory",
	            "type": {
	                "type": "memory_type",
	                "limits": {
	                    "type": "resizable_limits",
	                    "initial": 1,
	                    "maximum": null
	                }
	            }
	        },
        	{
	            "module": "processor",
	            "field": "delay_execute",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "exception",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32", "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "load",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32", "i32" ],
	                "returns": [ "i32" ]
	            }
	        },
	        {
	            "module": "processor",
	            "field": "store",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32", "i32", "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "mfc0",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32", "i32" ],
	                "returns": [ "i32" ]
	            }
	        },
	        {
	            "module": "processor",
	            "field": "mtc0",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32", "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "rfe",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "tlbr",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "tlbwi",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "tlbwr",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32" ],
	                "returns": []
	            }
	        },
	        {
	            "module": "processor",
	            "field": "tlbp",
	            "type": {
	                "type": "func_type",
	                "parameters": [ "i32", "i32" ],
	                "returns": []
	            }
	        }
	    ]
	}

	Object.keys(functions).forEach((name, i) => {
		result.function_section.push(functions[name]);
		result.export_section.push({
            "field": name,
            "kind": "func_type",
            "index": i + CALLS.EXPORT_BASE_INDEX
		});
	});

	return Export(result);
}
