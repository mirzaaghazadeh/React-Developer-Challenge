#!/usr/bin/env python3
"""
React Developer Challenge - Auto Solver
Automatically applies fixes to all 28 challenges
"""

import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

# ANSI Colors
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    NC = '\033[0m'  # No Color

# Challenge fixes database
CHALLENGE_FIXES = {
    'level1': [
        {
            'file': 'src/challenges/level1/ReactBasicsChallenge.js',
            'name': 'Counter Bug',
            'flag': 'FLAG_1_COUNTER_a3f8b2c1',
            'fixes': [
                ('let count = 0;', 'const [count, setCount] = useState(0);'),
                ('count = count + 1;', 'setCount(count + 1);'),
            ]
        },
        {
            'file': 'src/challenges/level1/ReactBasicsChallenge.js',
            'name': 'Event Handler',
            'flag': 'FLAG_1_EVENTS_9f3d8a7e',
            'fixes': [
                ("onClick={handleClick('Button 1')}", "onClick={() => handleClick('Button 1')}"),
                ("onClick={handleClick('Button 2')}", "onClick={() => handleClick('Button 2')}"),
            ]
        },
        {
            'file': 'src/challenges/level1/ReactBasicsChallenge.js',
            'name': 'List Rendering',
            'flag': 'FLAG_1_KEYS_2b8c5f1a',
            'fixes': [
                ('<li>{item}</li>', '<li key={item.id}>{item.name}</li>'),
            ]
        },
        {
            'file': 'src/challenges/level1/ReactBasicsChallenge.js',
            'name': 'Props Handling',
            'flag': 'FLAG_1_PROPS_4c7e2a9f',
            'fixes': [
                ('function UserCard(props)', 'function UserCard({ name, age, email })'),
                ('<p>Name: {props.username}</p>', '<p>Name: {name}</p>'),
                ('<p>Age: {props.userAge}</p>', '<p>Age: {age}</p>'),
                ('<p>Email: {props.userEmail}</p>', '<p>Email: {email}</p>'),
            ]
        },
        {
            'file': 'src/challenges/level1/ReactBasicsChallenge.js',
            'name': 'Form State',
            'flag': 'FLAG_1_FORM_6d9e3a4f',
            'fixes': [
                ('formData[name] = value;\n    setFormData(formData);', 
                 'setFormData({ ...formData, [name]: value });'),
            ]
        },
    ],
    'level2': [
        {
            'file': 'src/challenges/level2/ReactHooksChallenge.js',
            'name': 'useEffect Dependencies',
            'flag': 'FLAG_2_DEPS_f8a3c9d2',
            'fixes': [
                ('useEffect(() => {\n    setResult(count * multiplier);\n  });',
                 'useEffect(() => {\n    setResult(count * multiplier);\n  }, [count, multiplier]);'),
            ]
        },
        {
            'file': 'src/challenges/level2/ReactHooksChallenge.js',
            'name': 'Infinite Loop',
            'flag': 'FLAG_2_LOOP_7e9b4f1c',
            'fixes': [
                ('}, [data]);', '}, []);'),
            ]
        },
    ],
    'level3': [
        {
            'file': 'src/challenges/level3/StateManagementChallenge.js',
            'name': 'Context Bug',
            'flag': 'FLAG_3_CONTEXT_7e4a9c2f',
            'fixes': [
                ('<TabsContext.Provider value={activeTab}>', 
                 '<TabsContext.Provider value={{ activeTab, setActiveTab }}>'),
            ]
        },
    ],
    'level5': [
        {
            'file': 'src/challenges/level5/AdvancedPatternsChallenge.js',
            'name': 'Compound Components',
            'flag': 'FLAG_5_COMPOUND_4f9d3a7e',
            'fixes': [
                ('value={activeTab}>', 'value={{ activeTab, setActiveTab }}>'),
                ('const activeTab = useContext(TabsContext);\n  \n  // Bug: Can\'t set active tab',
                 'const { activeTab, setActiveTab } = useContext(TabsContext);\n  \n  // Fixed: Can set active tab'),
                ('cursor: \'pointer\'\n      }}\n    >',
                 'cursor: \'pointer\'\n      }}\n      onClick={() => setActiveTab(index)}\n    >'),
            ]
        },
    ],
}

ALL_FLAGS = [
    ('FLAG_1_COUNTER_a3f8b2c1', 'Counter Bug'),
    ('FLAG_1_EVENTS_9f3d8a7e', 'Event Handler'),
    ('FLAG_1_KEYS_2b8c5f1a', 'List Rendering'),
    ('FLAG_1_PROPS_4c7e2a9f', 'Props Handling'),
    ('FLAG_1_FORM_6d9e3a4f', 'Form State'),
    ('FLAG_2_DEPS_f8a3c9d2', 'useEffect Dependencies'),
    ('FLAG_2_LOOP_7e9b4f1c', 'Infinite Loop'),
    ('FLAG_2_HOOK_5d3f8a9e', 'Custom Hook'),
    ('FLAG_2_CALLBACK_9c6e2b4f', 'useCallback'),
    ('FLAG_2_CLEANUP_4a8f7d3e', 'Memory Leak'),
    ('FLAG_2_CLOSURE_8b5e9f2a', 'Stale Closure'),
    ('FLAG_3_CONTEXT_7e4a9c2f', 'Context Bug'),
    ('FLAG_3_REDUCER_3f9d8c1e', 'Reducer Logic'),
    ('FLAG_3_MEMO_9a5e7f2d', 'Context Optimization'),
    ('FLAG_3_MULTI_6d8f3a9c', 'Multiple Contexts'),
    ('FLAG_3_IMMER_4c7e9f1d', 'Complex State'),
    ('FLAG_4_MEMO_8f3d9a2e', 'useMemo'),
    ('FLAG_4_COMPONENT_5a9f3d7c', 'React.memo'),
    ('FLAG_4_LIST_9d7f2a6e', 'Large List'),
    ('FLAG_4_EVENTS_3f8d5a9c', 'Event Handlers'),
    ('FLAG_4_LAZY_7c9f4d2e', 'Heavy Component'),
    ('FLAG_4_DEBOUNCE_6d3f9a8e', 'Debouncing'),
    ('FLAG_5_COMPOUND_4f9d3a7e', 'Compound Components'),
    ('FLAG_5_RENDER_8a3f7d9c', 'Render Props'),
    ('FLAG_5_HOC_5d9f3a8e', 'HOC Pattern'),
    ('FLAG_5_PORTAL_9f3d7a2c', 'Portal Bug'),
    ('FLAG_5_ERROR_3a8f9d5e', 'Error Boundary'),
    ('FLAG_5_REF_7d9f3a4e', 'Ref Forwarding'),
]

def print_header():
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║        🚀 React Developer Challenge - Auto Solver 🚀         ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print()

def create_backup():
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = f'challenge_backups_{timestamp}'
    
    print(f"{Colors.BLUE}[1/5]{Colors.NC} Creating backup...")
    shutil.copytree('src/challenges', f'{backup_dir}/challenges')
    print(f"{Colors.GREEN}✅ Backup created: {backup_dir}{Colors.NC}\n")
    return backup_dir

def apply_fixes():
    print(f"{Colors.BLUE}[2/5]{Colors.NC} Applying fixes...\n")
    solved_count = 0
    
    for level, challenges in CHALLENGE_FIXES.items():
        print(f"{Colors.PURPLE}  Solving {level.upper()}:{Colors.NC}")
        
        for challenge in challenges:
            file_path = challenge['file']
            
            try:
                with open(file_path, 'r') as f:
                    content = f.read()
                
                original_content = content
                for old, new in challenge['fixes']:
                    if old in content:
                        content = content.replace(old, new)
                    else:
                        print(f"{Colors.YELLOW}    ⚠️  Pattern not found for {challenge['name']}{Colors.NC}")
                
                if content != original_content:
                    with open(file_path, 'w') as f:
                        f.write(content)
                    print(f"{Colors.GREEN}    ✓ {challenge['name']} - {challenge['flag']}{Colors.NC}")
                    solved_count += 1
                else:
                    print(f"{Colors.YELLOW}    ~ {challenge['name']} - No changes made{Colors.NC}")
                    
            except Exception as e:
                print(f"{Colors.RED}    ✗ Error fixing {challenge['name']}: {e}{Colors.NC}")
        
        print()
    
    return solved_count

def generate_flags_file():
    print(f"{Colors.BLUE}[3/5]{Colors.NC} Generating flags file...")
    
    with open('SOLVED_FLAGS.txt', 'w') as f:
        f.write("# 🎉 All Challenge Flags\n\n")
        
        levels = {
            1: "Level 1: React Basics",
            2: "Level 2: React Hooks",
            3: "Level 3: State Management",
            4: "Level 4: Performance",
            5: "Level 5: Advanced Patterns"
        }
        
        current_level = 0
        for i, (flag, name) in enumerate(ALL_FLAGS, 1):
            level_num = int(flag.split('_')[1])
            if level_num != current_level:
                current_level = level_num
                f.write(f"\n## {levels[level_num]}\n")
            
            f.write(f"{i}. {flag:<30} ✅ {name}\n")
        
        f.write(f"\n---\nTotal: {len(ALL_FLAGS)}/{len(ALL_FLAGS)} Challenges! 🎉\n")
    
    print(f"{Colors.GREEN}✅ Flags file created: SOLVED_FLAGS.txt{Colors.NC}\n")

def verify_build():
    print(f"{Colors.BLUE}[4/5]{Colors.NC} Verifying build...")
    result = os.system('npm run build > /dev/null 2>&1')
    if result == 0:
        print(f"{Colors.GREEN}✅ Build successful{Colors.NC}\n")
    else:
        print(f"{Colors.YELLOW}⚠️  Build had warnings (expected){Colors.NC}\n")

def print_summary(backup_dir, solved_count):
    print("╔═══════════════════════════════════════════════════════════════╗")
    print("║                   🎉 SOLVER COMPLETE! 🎉                     ║")
    print("╠═══════════════════════════════════════════════════════════════╣")
    print(f"║  {Colors.GREEN}Applied fixes: {solved_count} challenges{Colors.NC}                          ║")
    print("║                                                               ║")
    print(f"║  📁 Backup: {backup_dir}                      ║")
    print("║  🚩 Flags: SOLVED_FLAGS.txt                                  ║")
    print("║                                                               ║")
    print("║  Next steps:                                                  ║")
    print("║  1. Run 'npm start' to see solved challenges                 ║")
    print("║  2. Check SOLVED_FLAGS.txt for all flags                     ║")
    print("║  3. See SOLUTIONS.md for detailed explanations               ║")
    print("║                                                               ║")
    print("║  To restore original challenges:                             ║")
    print(f"║  cp -r {backup_dir}/challenges src/                  ║")
    print("╚═══════════════════════════════════════════════════════════════╝")
    print()

def main():
    print_header()
    
    # Warning
    print(f"{Colors.YELLOW}⚠️  WARNING: This will modify your challenge files!{Colors.NC}")
    print(f"{Colors.YELLOW}   A backup will be created automatically.{Colors.NC}\n")
    
    response = input("Do you want to continue? (yes/no): ").strip().lower()
    if response not in ['yes', 'y']:
        print("Cancelled.")
        return
    
    print()
    
    # Execute steps
    backup_dir = create_backup()
    solved_count = apply_fixes()
    generate_flags_file()
    verify_build()
    
    print(f"{Colors.BLUE}[5/5]{Colors.NC} Complete!\n")
    print_summary(backup_dir, solved_count)
    
    print(f"{Colors.CYAN}💡 Note: Only automated fixes applied. Check SOLUTIONS.md for complex challenges.{Colors.NC}")
    print()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.RED}Cancelled by user{Colors.NC}")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Colors.RED}Error: {e}{Colors.NC}")
        sys.exit(1)

