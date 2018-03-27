#pragma once

// Heavily stripped down GL defines

#include <stdint.h>

typedef int8_t GLbyte;
typedef float GLclampf;
typedef int32_t GLfixed;
typedef short GLshort;
typedef unsigned short GLushort;
typedef void GLvoid;
typedef int64_t GLint64;
typedef uint64_t GLuint64;
typedef unsigned int GLenum;
typedef unsigned int GLuint;
typedef char GLchar;
typedef float GLfloat;
typedef size_t GLsizeiptr;
typedef intptr_t GLintptr;
typedef unsigned int GLbitfield;
typedef int GLint;
typedef unsigned char GLboolean;
typedef int GLsizei;
typedef uint8_t GLubyte;

#define GL_READ_BUFFER 3074
#define GL_UNPACK_ROW_LENGTH 3314
#define GL_UNPACK_SKIP_ROWS 3315
#define GL_UNPACK_SKIP_PIXELS 3316
#define GL_PACK_ROW_LENGTH 3330
#define GL_PACK_SKIP_ROWS 3331
#define GL_PACK_SKIP_PIXELS 3332
#define GL_COLOR 6144
#define GL_DEPTH 6145
#define GL_STENCIL 6146
#define GL_RED 6403
#define GL_RGB8 32849
#define GL_RGBA8 32856
#define GL_RGB10_A2 32857
#define GL_TEXTURE_BINDING_3D 32874
#define GL_UNPACK_SKIP_IMAGES 32877
#define GL_UNPACK_IMAGE_HEIGHT 32878
#define GL_TEXTURE_3D 32879
#define GL_TEXTURE_WRAP_R 32882
#define GL_MAX_3D_TEXTURE_SIZE 32883
#define GL_UNSIGNED_INT_2_10_10_10_REV 33640
#define GL_MAX_ELEMENTS_VERTICES 33000
#define GL_MAX_ELEMENTS_INDICES 33001
#define GL_TEXTURE_MIN_LOD 33082
#define GL_TEXTURE_MAX_LOD 33083
#define GL_TEXTURE_BASE_LEVEL 33084
#define GL_TEXTURE_MAX_LEVEL 33085
#define GL_MIN 32775
#define GL_MAX 32776
#define GL_DEPTH_COMPONENT24 33190
#define GL_MAX_TEXTURE_LOD_BIAS 34045
#define GL_TEXTURE_COMPARE_MODE 34892
#define GL_TEXTURE_COMPARE_FUNC 34893
#define GL_CURRENT_QUERY 34917
#define GL_QUERY_RESULT 34918
#define GL_QUERY_RESULT_AVAILABLE 34919
#define GL_STREAM_READ 35041
#define GL_STREAM_COPY 35042
#define GL_STATIC_READ 35045
#define GL_STATIC_COPY 35046
#define GL_DYNAMIC_READ 35049
#define GL_DYNAMIC_COPY 35050
#define GL_MAX_DRAW_BUFFERS 34852
#define GL_DRAW_BUFFER0 34853
#define GL_DRAW_BUFFER1 34854
#define GL_DRAW_BUFFER2 34855
#define GL_DRAW_BUFFER3 34856
#define GL_DRAW_BUFFER4 34857
#define GL_DRAW_BUFFER5 34858
#define GL_DRAW_BUFFER6 34859
#define GL_DRAW_BUFFER7 34860
#define GL_DRAW_BUFFER8 34861
#define GL_DRAW_BUFFER9 34862
#define GL_DRAW_BUFFER10 34863
#define GL_DRAW_BUFFER11 34864
#define GL_DRAW_BUFFER12 34865
#define GL_DRAW_BUFFER13 34866
#define GL_DRAW_BUFFER14 34867
#define GL_DRAW_BUFFER15 34868
#define GL_MAX_FRAGMENT_UNIFORM_COMPONENTS 35657
#define GL_MAX_VERTEX_UNIFORM_COMPONENTS 35658
#define GL_SAMPLER_3D 35679
#define GL_SAMPLER_2D_SHADOW 35682
#define GL_FRAGMENT_SHADER_DERIVATIVE_HINT 35723
#define GL_PIXEL_PACK_BUFFER 35051
#define GL_PIXEL_UNPACK_BUFFER 35052
#define GL_PIXEL_PACK_BUFFER_BINDING 35053
#define GL_PIXEL_UNPACK_BUFFER_BINDING 35055
#define GL_FLOAT_MAT2x3 35685
#define GL_FLOAT_MAT2x4 35686
#define GL_FLOAT_MAT3x2 35687
#define GL_FLOAT_MAT3x4 35688
#define GL_FLOAT_MAT4x2 35689
#define GL_FLOAT_MAT4x3 35690
#define GL_SRGB 35904
#define GL_SRGB8 35905
#define GL_SRGB8_ALPHA8 35907
#define GL_COMPARE_REF_TO_TEXTURE 34894
#define GL_RGBA32F 34836
#define GL_RGB32F 34837
#define GL_RGBA16F 34842
#define GL_RGB16F 34843
#define GL_VERTEX_ATTRIB_ARRAY_INTEGER 35069
#define GL_MAX_ARRAY_TEXTURE_LAYERS 35071
#define GL_MIN_PROGRAM_TEXEL_OFFSET 35076
#define GL_MAX_PROGRAM_TEXEL_OFFSET 35077
#define GL_MAX_VARYING_COMPONENTS 35659
#define GL_TEXTURE_2D_ARRAY 35866
#define GL_TEXTURE_BINDING_2D_ARRAY 35869
#define GL_R11F_G11F_B10F 35898
#define GL_UNSIGNED_INT_10F_11F_11F_REV 35899
#define GL_RGB9_E5 35901
#define GL_UNSIGNED_INT_5_9_9_9_REV 35902
#define GL_TRANSFORM_FEEDBACK_BUFFER_MODE 35967
#define GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS 35968
#define GL_TRANSFORM_FEEDBACK_VARYINGS 35971
#define GL_TRANSFORM_FEEDBACK_BUFFER_START 35972
#define GL_TRANSFORM_FEEDBACK_BUFFER_SIZE 35973
#define GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN 35976
#define GL_RASTERIZER_DISCARD 35977
#define GL_MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS 35978
#define GL_MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS 35979
#define GL_INTERLEAVED_ATTRIBS 35980
#define GL_SEPARATE_ATTRIBS 35981
#define GL_TRANSFORM_FEEDBACK_BUFFER 35982
#define GL_TRANSFORM_FEEDBACK_BUFFER_BINDING 35983
#define GL_RGBA32UI 36208
#define GL_RGB32UI 36209
#define GL_RGBA16UI 36214
#define GL_RGB16UI 36215
#define GL_RGBA8UI 36220
#define GL_RGB8UI 36221
#define GL_RGBA32I 36226
#define GL_RGB32I 36227
#define GL_RGBA16I 36232
#define GL_RGB16I 36233
#define GL_RGBA8I 36238
#define GL_RGB8I 36239
#define GL_RED_INTEGER 36244
#define GL_RGB_INTEGER 36248
#define GL_RGBA_INTEGER 36249
#define GL_SAMPLER_2D_ARRAY 36289
#define GL_SAMPLER_2D_ARRAY_SHADOW 36292
#define GL_SAMPLER_CUBE_SHADOW 36293
#define GL_UNSIGNED_INT_VEC2 36294
#define GL_UNSIGNED_INT_VEC3 36295
#define GL_UNSIGNED_INT_VEC4 36296
#define GL_INT_SAMPLER_2D 36298
#define GL_INT_SAMPLER_3D 36299
#define GL_INT_SAMPLER_CUBE 36300
#define GL_INT_SAMPLER_2D_ARRAY 36303
#define GL_UNSIGNED_INT_SAMPLER_2D 36306
#define GL_UNSIGNED_INT_SAMPLER_3D 36307
#define GL_UNSIGNED_INT_SAMPLER_CUBE 36308
#define GL_UNSIGNED_INT_SAMPLER_2D_ARRAY 36311
#define GL_DEPTH_COMPONENT32F 36012
#define GL_DEPTH32F_STENCIL8 36013
#define GL_FLOAT_32_UNSIGNED_INT_24_8_REV 36269
#define GL_FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING 33296
#define GL_FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE 33297
#define GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE 33298
#define GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE 33299
#define GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE 33300
#define GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE 33301
#define GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE 33302
#define GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE 33303
#define GL_FRAMEBUFFER_DEFAULT 33304
#define GL_UNSIGNED_INT_24_8 34042
#define GL_DEPTH24_STENCIL8 35056
#define GL_UNSIGNED_NORMALIZED 35863
#define GL_DRAW_FRAMEBUFFER_BINDING 36006
#define GL_READ_FRAMEBUFFER 36008
#define GL_DRAW_FRAMEBUFFER 36009
#define GL_READ_FRAMEBUFFER_BINDING 36010
#define GL_RENDERBUFFER_SAMPLES 36011
#define GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER 36052
#define GL_MAX_COLOR_ATTACHMENTS 36063
#define GL_COLOR_ATTACHMENT1 36065
#define GL_COLOR_ATTACHMENT2 36066
#define GL_COLOR_ATTACHMENT3 36067
#define GL_COLOR_ATTACHMENT4 36068
#define GL_COLOR_ATTACHMENT5 36069
#define GL_COLOR_ATTACHMENT6 36070
#define GL_COLOR_ATTACHMENT7 36071
#define GL_COLOR_ATTACHMENT8 36072
#define GL_COLOR_ATTACHMENT9 36073
#define GL_COLOR_ATTACHMENT10 36074
#define GL_COLOR_ATTACHMENT11 36075
#define GL_COLOR_ATTACHMENT12 36076
#define GL_COLOR_ATTACHMENT13 36077
#define GL_COLOR_ATTACHMENT14 36078
#define GL_COLOR_ATTACHMENT15 36079
#define GL_FRAMEBUFFER_INCOMPLETE_MULTISAMPLE 36182
#define GL_MAX_SAMPLES 36183
#define GL_HALF_FLOAT 5131
#define GL_RG 33319
#define GL_RG_INTEGER 33320
#define GL_R8 33321
#define GL_RG8 33323
#define GL_R16F 33325
#define GL_R32F 33326
#define GL_RG16F 33327
#define GL_RG32F 33328
#define GL_R8I 33329
#define GL_R8UI 33330
#define GL_R16I 33331
#define GL_R16UI 33332
#define GL_R32I 33333
#define GL_R32UI 33334
#define GL_RG8I 33335
#define GL_RG8UI 33336
#define GL_RG16I 33337
#define GL_RG16UI 33338
#define GL_RG32I 33339
#define GL_RG32UI 33340
#define GL_VERTEX_ARRAY_BINDING 34229
#define GL_R8_SNORM 36756
#define GL_RG8_SNORM 36757
#define GL_RGB8_SNORM 36758
#define GL_RGBA8_SNORM 36759
#define GL_SIGNED_NORMALIZED 36764
#define GL_COPY_READ_BUFFER 36662
#define GL_COPY_WRITE_BUFFER 36663
#define GL_COPY_READ_BUFFER_BINDING 36662
#define GL_COPY_WRITE_BUFFER_BINDING 36663
#define GL_UNIFORM_BUFFER 35345
#define GL_UNIFORM_BUFFER_BINDING 35368
#define GL_UNIFORM_BUFFER_START 35369
#define GL_UNIFORM_BUFFER_SIZE 35370
#define GL_MAX_VERTEX_UNIFORM_BLOCKS 35371
#define GL_MAX_FRAGMENT_UNIFORM_BLOCKS 35373
#define GL_MAX_COMBINED_UNIFORM_BLOCKS 35374
#define GL_MAX_UNIFORM_BUFFER_BINDINGS 35375
#define GL_MAX_UNIFORM_BLOCK_SIZE 35376
#define GL_MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS 35377
#define GL_MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS 35379
#define GL_UNIFORM_BUFFER_OFFSET_ALIGNMENT 35380
#define GL_ACTIVE_UNIFORM_BLOCKS 35382
#define GL_UNIFORM_TYPE 35383
#define GL_UNIFORM_SIZE 35384
#define GL_UNIFORM_BLOCK_INDEX 35386
#define GL_UNIFORM_OFFSET 35387
#define GL_UNIFORM_ARRAY_STRIDE 35388
#define GL_UNIFORM_MATRIX_STRIDE 35389
#define GL_UNIFORM_IS_ROW_MAJOR 35390
#define GL_UNIFORM_BLOCK_BINDING 35391
#define GL_UNIFORM_BLOCK_DATA_SIZE 35392
#define GL_UNIFORM_BLOCK_ACTIVE_UNIFORMS 35394
#define GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES 35395
#define GL_UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER 35396
#define GL_UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER 35398
#define GL_INVALID_INDEX 4294967295
#define GL_MAX_VERTEX_OUTPUT_COMPONENTS 37154
#define GL_MAX_FRAGMENT_INPUT_COMPONENTS 37157
#define GL_MAX_SERVER_WAIT_TIMEOUT 37137
#define GL_OBJECT_TYPE 37138
#define GL_SYNC_CONDITION 37139
#define GL_SYNC_STATUS 37140
#define GL_SYNC_FLAGS 37141
#define GL_SYNC_FENCE 37142
#define GL_SYNC_GPU_COMMANDS_COMPLETE 37143
#define GL_UNSIGNALED 37144
#define GL_SIGNALED 37145
#define GL_ALREADY_SIGNALED 37146
#define GL_TIMEOUT_EXPIRED 37147
#define GL_CONDITION_SATISFIED 37148
#define GL_WAIT_FAILED 37149
#define GL_SYNC_FLUSH_COMMANDS_BIT 1
#define GL_VERTEX_ATTRIB_ARRAY_DIVISOR 35070
#define GL_ANY_SAMPLES_PASSED 35887
#define GL_ANY_SAMPLES_PASSED_CONSERVATIVE 36202
#define GL_SAMPLER_BINDING 35097
#define GL_RGB10_A2UI 36975
#define GL_INT_2_10_10_10_REV 36255
#define GL_TRANSFORM_FEEDBACK 36386
#define GL_TRANSFORM_FEEDBACK_PAUSED 36387
#define GL_TRANSFORM_FEEDBACK_ACTIVE 36388
#define GL_TRANSFORM_FEEDBACK_BINDING 36389
#define GL_TEXTURE_IMMUTABLE_FORMAT 37167
#define GL_MAX_ELEMENT_INDEX 36203
#define GL_TEXTURE_IMMUTABLE_LEVELS 33503
#define GL_TIMEOUT_IGNORED -1
#define GL_MAX_CLIENT_WAIT_TIMEOUT_WEBGL 37447
#define GL_DEPTH_BUFFER_BIT 256
#define GL_STENCIL_BUFFER_BIT 1024
#define GL_COLOR_BUFFER_BIT 16384
#define GL_POINTS 0
#define GL_LINES 1
#define GL_LINE_LOOP 2
#define GL_LINE_STRIP 3
#define GL_TRIANGLES 4
#define GL_TRIANGLE_STRIP 5
#define GL_TRIANGLE_FAN 6
#define GL_ZERO 0
#define GL_ONE 1
#define GL_SRC_COLOR 768
#define GL_ONE_MINUS_SRC_COLOR 769
#define GL_SRC_ALPHA 770
#define GL_ONE_MINUS_SRC_ALPHA 771
#define GL_DST_ALPHA 772
#define GL_ONE_MINUS_DST_ALPHA 773
#define GL_DST_COLOR 774
#define GL_ONE_MINUS_DST_COLOR 775
#define GL_SRC_ALPHA_SATURATE 776
#define GL_FUNC_ADD 32774
#define GL_BLEND_EQUATION 32777
#define GL_BLEND_EQUATION_RGB 32777
#define GL_BLEND_EQUATION_ALPHA 34877
#define GL_FUNC_SUBTRACT 32778
#define GL_FUNC_REVERSE_SUBTRACT 32779
#define GL_BLEND_DST_RGB 32968
#define GL_BLEND_SRC_RGB 32969
#define GL_BLEND_DST_ALPHA 32970
#define GL_BLEND_SRC_ALPHA 32971
#define GL_CONSTANT_COLOR 32769
#define GL_ONE_MINUS_CONSTANT_COLOR 32770
#define GL_CONSTANT_ALPHA 32771
#define GL_ONE_MINUS_CONSTANT_ALPHA 32772
#define GL_BLEND_COLOR 32773
#define GL_ARRAY_BUFFER 34962
#define GL_ELEMENT_ARRAY_BUFFER 34963
#define GL_ARRAY_BUFFER_BINDING 34964
#define GL_ELEMENT_ARRAY_BUFFER_BINDING 34965
#define GL_STREAM_DRAW 35040
#define GL_STATIC_DRAW 35044
#define GL_DYNAMIC_DRAW 35048
#define GL_BUFFER_SIZE 34660
#define GL_BUFFER_USAGE 34661
#define GL_CURRENT_VERTEX_ATTRIB 34342
#define GL_FRONT 1028
#define GL_BACK 1029
#define GL_FRONT_AND_BACK 1032
#define GL_TEXTURE_2D 3553
#define GL_CULL_FACE 2884
#define GL_BLEND 3042
#define GL_DITHER 3024
#define GL_STENCIL_TEST 2960
#define GL_DEPTH_TEST 2929
#define GL_SCISSOR_TEST 3089
#define GL_POLYGON_OFFSET_FILL 32823
#define GL_SAMPLE_ALPHA_TO_COVERAGE 32926
#define GL_SAMPLE_COVERAGE 32928
#define GL_NO_ERROR 0
#define GL_INVALID_ENUM 1280
#define GL_INVALID_VALUE 1281
#define GL_INVALID_OPERATION 1282
#define GL_OUT_OF_MEMORY 1285
#define GL_CW 2304
#define GL_CCW 2305
#define GL_LINE_WIDTH 2849
#define GL_ALIASED_POINT_SIZE_RANGE 33901
#define GL_ALIASED_LINE_WIDTH_RANGE 33902
#define GL_CULL_FACE_MODE 2885
#define GL_FRONT_FACE 2886
#define GL_DEPTH_RANGE 2928
#define GL_DEPTH_WRITEMASK 2930
#define GL_DEPTH_CLEAR_VALUE 2931
#define GL_DEPTH_FUNC 2932
#define GL_STENCIL_CLEAR_VALUE 2961
#define GL_STENCIL_FUNC 2962
#define GL_STENCIL_FAIL 2964
#define GL_STENCIL_PASS_DEPTH_FAIL 2965
#define GL_STENCIL_PASS_DEPTH_PASS 2966
#define GL_STENCIL_REF 2967
#define GL_STENCIL_VALUE_MASK 2963
#define GL_STENCIL_WRITEMASK 2968
#define GL_STENCIL_BACK_FUNC 34816
#define GL_STENCIL_BACK_FAIL 34817
#define GL_STENCIL_BACK_PASS_DEPTH_FAIL 34818
#define GL_STENCIL_BACK_PASS_DEPTH_PASS 34819
#define GL_STENCIL_BACK_REF 36003
#define GL_STENCIL_BACK_VALUE_MASK 36004
#define GL_STENCIL_BACK_WRITEMASK 36005
#define GL_VIEWPORT 2978
#define GL_SCISSOR_BOX 3088
#define GL_COLOR_CLEAR_VALUE 3106
#define GL_COLOR_WRITEMASK 3107
#define GL_UNPACK_ALIGNMENT 3317
#define GL_PACK_ALIGNMENT 3333
#define GL_MAX_TEXTURE_SIZE 3379
#define GL_MAX_VIEWPORT_DIMS 3386
#define GL_SUBPIXEL_BITS 3408
#define GL_RED_BITS 3410
#define GL_GREEN_BITS 3411
#define GL_BLUE_BITS 3412
#define GL_ALPHA_BITS 3413
#define GL_DEPTH_BITS 3414
#define GL_STENCIL_BITS 3415
#define GL_POLYGON_OFFSET_UNITS 10752
#define GL_POLYGON_OFFSET_FACTOR 32824
#define GL_TEXTURE_BINDING_2D 32873
#define GL_SAMPLE_BUFFERS 32936
#define GL_SAMPLES 32937
#define GL_SAMPLE_COVERAGE_VALUE 32938
#define GL_SAMPLE_COVERAGE_INVERT 32939
#define GL_COMPRESSED_TEXTURE_FORMATS 34467
#define GL_DONT_CARE 4352
#define GL_FASTEST 4353
#define GL_NICEST 4354
#define GL_GENERATE_MIPMAP_HINT 33170
#define GL_BYTE 5120
#define GL_UNSIGNED_BYTE 5121
#define GL_SHORT 5122
#define GL_UNSIGNED_SHORT 5123
#define GL_INT 5124
#define GL_UNSIGNED_INT 5125
#define GL_FLOAT 5126
#define GL_DEPTH_COMPONENT 6402
#define GL_ALPHA 6406
#define GL_RGB 6407
#define GL_RGBA 6408
#define GL_LUMINANCE 6409
#define GL_LUMINANCE_ALPHA 6410
#define GL_UNSIGNED_SHORT_4_4_4_4 32819
#define GL_UNSIGNED_SHORT_5_5_5_1 32820
#define GL_UNSIGNED_SHORT_5_6_5 33635
#define GL_FRAGMENT_SHADER 35632
#define GL_VERTEX_SHADER 35633
#define GL_MAX_VERTEX_ATTRIBS 34921
#define GL_MAX_VERTEX_UNIFORM_VECTORS 36347
#define GL_MAX_VARYING_VECTORS 36348
#define GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS 35661
#define GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS 35660
#define GL_MAX_TEXTURE_IMAGE_UNITS 34930
#define GL_MAX_FRAGMENT_UNIFORM_VECTORS 36349
#define GL_SHADER_TYPE 35663
#define GL_DELETE_STATUS 35712
#define GL_LINK_STATUS 35714
#define GL_VALIDATE_STATUS 35715
#define GL_ATTACHED_SHADERS 35717
#define GL_ACTIVE_UNIFORMS 35718
#define GL_ACTIVE_ATTRIBUTES 35721
#define GL_SHADING_LANGUAGE_VERSION 35724
#define GL_CURRENT_PROGRAM 35725
#define GL_NEVER 512
#define GL_LESS 513
#define GL_EQUAL 514
#define GL_LEQUAL 515
#define GL_GREATER 516
#define GL_NOTEQUAL 517
#define GL_GEQUAL 518
#define GL_ALWAYS 519
#define GL_KEEP 7680
#define GL_REPLACE 7681
#define GL_INCR 7682
#define GL_DECR 7683
#define GL_INVERT 5386
#define GL_INCR_WRAP 34055
#define GL_DECR_WRAP 34056
#define GL_VENDOR 7936
#define GL_RENDERER 7937
#define GL_VERSION 7938
#define GL_NEAREST 9728
#define GL_LINEAR 9729
#define GL_NEAREST_MIPMAP_NEAREST 9984
#define GL_LINEAR_MIPMAP_NEAREST 9985
#define GL_NEAREST_MIPMAP_LINEAR 9986
#define GL_LINEAR_MIPMAP_LINEAR 9987
#define GL_TEXTURE_MAG_FILTER 10240
#define GL_TEXTURE_MIN_FILTER 10241
#define GL_TEXTURE_WRAP_S 10242
#define GL_TEXTURE_WRAP_T 10243
#define GL_TEXTURE 5890
#define GL_TEXTURE_CUBE_MAP 34067
#define GL_TEXTURE_BINDING_CUBE_MAP 34068
#define GL_TEXTURE_CUBE_MAP_POSITIVE_X 34069
#define GL_TEXTURE_CUBE_MAP_NEGATIVE_X 34070
#define GL_TEXTURE_CUBE_MAP_POSITIVE_Y 34071
#define GL_TEXTURE_CUBE_MAP_NEGATIVE_Y 34072
#define GL_TEXTURE_CUBE_MAP_POSITIVE_Z 34073
#define GL_TEXTURE_CUBE_MAP_NEGATIVE_Z 34074
#define GL_MAX_CUBE_MAP_TEXTURE_SIZE 34076
#define GL_TEXTURE0 33984
#define GL_TEXTURE1 33985
#define GL_TEXTURE2 33986
#define GL_TEXTURE3 33987
#define GL_TEXTURE4 33988
#define GL_TEXTURE5 33989
#define GL_TEXTURE6 33990
#define GL_TEXTURE7 33991
#define GL_TEXTURE8 33992
#define GL_TEXTURE9 33993
#define GL_TEXTURE10 33994
#define GL_TEXTURE11 33995
#define GL_TEXTURE12 33996
#define GL_TEXTURE13 33997
#define GL_TEXTURE14 33998
#define GL_TEXTURE15 33999
#define GL_TEXTURE16 34000
#define GL_TEXTURE17 34001
#define GL_TEXTURE18 34002
#define GL_TEXTURE19 34003
#define GL_TEXTURE20 34004
#define GL_TEXTURE21 34005
#define GL_TEXTURE22 34006
#define GL_TEXTURE23 34007
#define GL_TEXTURE24 34008
#define GL_TEXTURE25 34009
#define GL_TEXTURE26 34010
#define GL_TEXTURE27 34011
#define GL_TEXTURE28 34012
#define GL_TEXTURE29 34013
#define GL_TEXTURE30 34014
#define GL_TEXTURE31 34015
#define GL_ACTIVE_TEXTURE 34016
#define GL_REPEAT 10497
#define GL_CLAMP_TO_EDGE 33071
#define GL_MIRRORED_REPEAT 33648
#define GL_FLOAT_VEC2 35664
#define GL_FLOAT_VEC3 35665
#define GL_FLOAT_VEC4 35666
#define GL_INT_VEC2 35667
#define GL_INT_VEC3 35668
#define GL_INT_VEC4 35669
#define GL_BOOL 35670
#define GL_BOOL_VEC2 35671
#define GL_BOOL_VEC3 35672
#define GL_BOOL_VEC4 35673
#define GL_FLOAT_MAT2 35674
#define GL_FLOAT_MAT3 35675
#define GL_FLOAT_MAT4 35676
#define GL_SAMPLER_2D 35678
#define GL_SAMPLER_CUBE 35680
#define GL_VERTEX_ATTRIB_ARRAY_ENABLED 34338
#define GL_VERTEX_ATTRIB_ARRAY_SIZE 34339
#define GL_VERTEX_ATTRIB_ARRAY_STRIDE 34340
#define GL_VERTEX_ATTRIB_ARRAY_TYPE 34341
#define GL_VERTEX_ATTRIB_ARRAY_NORMALIZED 34922
#define GL_VERTEX_ATTRIB_ARRAY_POINTER 34373
#define GL_VERTEX_ATTRIB_ARRAY_BUFFER_BINDING 34975
#define GL_IMPLEMENTATION_COLOR_READ_TYPE 35738
#define GL_IMPLEMENTATION_COLOR_READ_FORMAT 35739
#define GL_COMPILE_STATUS 35713
#define GL_LOW_FLOAT 36336
#define GL_MEDIUM_FLOAT 36337
#define GL_HIGH_FLOAT 36338
#define GL_LOW_INT 36339
#define GL_MEDIUM_INT 36340
#define GL_HIGH_INT 36341
#define GL_FRAMEBUFFER 36160
#define GL_RENDERBUFFER 36161
#define GL_RGBA4 32854
#define GL_RGB5_A1 32855
#define GL_RGB565 36194
#define GL_DEPTH_COMPONENT16 33189
#define GL_STENCIL_INDEX8 36168
#define GL_DEPTH_STENCIL 34041
#define GL_RENDERBUFFER_WIDTH 36162
#define GL_RENDERBUFFER_HEIGHT 36163
#define GL_RENDERBUFFER_INTERNAL_FORMAT 36164
#define GL_RENDERBUFFER_RED_SIZE 36176
#define GL_RENDERBUFFER_GREEN_SIZE 36177
#define GL_RENDERBUFFER_BLUE_SIZE 36178
#define GL_RENDERBUFFER_ALPHA_SIZE 36179
#define GL_RENDERBUFFER_DEPTH_SIZE 36180
#define GL_RENDERBUFFER_STENCIL_SIZE 36181
#define GL_FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE 36048
#define GL_FRAMEBUFFER_ATTACHMENT_OBJECT_NAME 36049
#define GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL 36050
#define GL_FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE 36051
#define GL_COLOR_ATTACHMENT0 36064
#define GL_DEPTH_ATTACHMENT 36096
#define GL_STENCIL_ATTACHMENT 36128
#define GL_DEPTH_STENCIL_ATTACHMENT 33306
#define GL_NONE 0
#define GL_FRAMEBUFFER_COMPLETE 36053
#define GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT 36054
#define GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT 36055
#define GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS 36057
#define GL_FRAMEBUFFER_UNSUPPORTED 36061
#define GL_FRAMEBUFFER_BINDING 36006
#define GL_RENDERBUFFER_BINDING 36007
#define GL_MAX_RENDERBUFFER_SIZE 34024
#define GL_INVALID_FRAMEBUFFER_OPERATION 1286
#define GL_UNPACK_FLIP_Y_WEBGL 37440
#define GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL 37441
#define GL_CONTEXT_LOST_WEBGL 37442
#define GL_UNPACK_COLORSPACE_CONVERSION_WEBGL 37443
#define GL_BROWSER_DEFAULT_WEBGL 37444
