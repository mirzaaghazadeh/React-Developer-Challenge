/**
 * Flag validation service
 * Validates flag format and authenticity
 */

const validFlags = [
  // Level 1
  'FLAG_1_COUNTER_a3f8b2c1',
  'FLAG_1_EVENTS_7d2c9f4e',
  'FLAG_1_RENDERING_e8a1b6d3',
  'FLAG_1_PROPS_4c7e2a9f',
  'FLAG_1_FORM_9b3f6d2e',
  
  // Level 2
  'FLAG_2_EFFECT_5d8a2c7f',
  'FLAG_2_LOOP_3f7b9e4a',
  'FLAG_2_HOOK_8e2d5a3c',
  'FLAG_2_CALLBACK_6a9c4f2e',
  'FLAG_2_MEMORY_2c8f5d3a',
  'FLAG_2_REF_9d4b7e2a',
  
  // Level 3
  'FLAG_3_CONTEXT_7e4a9c2f',
  'FLAG_3_REDUCER_3d8f2a6c',
  'FLAG_3_BATCH_6c2e9a4f',
  'FLAG_3_NESTED_4a7e2c9f',
  'FLAG_3_PERF_9e3c7a2d',
  
  // Level 4
  'FLAG_4_MEMO_5c8e2a7f',
  'FLAG_4_REACTMEMO_3d7a9c2f',
  'FLAG_4_LISTPERF_8e4a2c9f',
  'FLAG_4_CALLBACK_6c3e9a2f',
  'FLAG_4_LAZYLOAD_7d4b2e8a',
  'FLAG_4_DEBOUNCE_2e8c5a7f',
  
  // Level 5
  'FLAG_5_COMPOUND_8e3c7a2f',
  'FLAG_5_RENDERPROPS_4c9e2a7f',
  'FLAG_5_HOC_6d3e9a2c',
  'FLAG_5_PORTAL_7e4a2c9f',
  'FLAG_5_ERRORBOUNDARY_3d8c5a2f',
  'FLAG_5_HOOKCOMP_9e2c7a4f'
];

export function validateFlag(flag) {
  const trimmedFlag = flag.trim().toUpperCase();
  
  // Check flag format
  const flagPattern = /^FLAG_\d+_[A-Z]+_[a-f0-9]{8}$/i;
  
  if (!flagPattern.test(trimmedFlag)) {
    return false;
  }
  
  // Check if flag is in valid list
  return validFlags.some(validFlag => 
    validFlag.toUpperCase() === trimmedFlag
  );
}

export function getFlagLevel(flag) {
  const match = flag.match(/^FLAG_(\d+)_/);
  return match ? parseInt(match[1]) : 0;
}

export function getFlagChallengeName(flag) {
  const match = flag.match(/^FLAG_\d+_([A-Z]+)_/);
  return match ? match[1] : '';
}

export function getAllFlags() {
  return [...validFlags];
}

export function getFlagsByLevel(level) {
  return validFlags.filter(flag => getFlagLevel(flag) === level);
}

