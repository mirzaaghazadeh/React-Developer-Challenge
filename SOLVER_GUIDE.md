# 🤖 Challenge Auto-Solver Guide

## Available Solvers

### 1. **solve-challenges.py** (Recommended) 🐍
Python-based solver with better error handling and clearer output.

**Usage:**
```bash
python3 solve-challenges.py
```

**Features:**
- ✅ Automatically creates timestamped backup
- ✅ Applies fixes to all automated challenges
- ✅ Generates `SOLVED_FLAGS.txt` with all flags
- ✅ Verifies build after solving
- ✅ Color-coded output
- ✅ Progress tracking

---

### 2. **solve-all-challenges.sh** (Alternative) 🐚
Bash-based solver for quick execution.

**Usage:**
```bash
./solve-all-challenges.sh
```

**Features:**
- ✅ Fast execution
- ✅ Creates backup
- ✅ Solves Level 1 challenges
- ✅ Generates flags file

---

## What Gets Solved?

### ✅ Fully Automated (Applied by Scripts):
- **Level 1** (5 challenges):
  - Counter Bug
  - Event Handler
  - List Rendering
  - Props Handling
  - Form State

- **Level 2** (2 challenges):
  - useEffect Dependencies
  - Infinite Loop

- **Level 3** (1 challenge):
  - Context Bug

- **Level 5** (1 challenge):
  - Compound Components

### 📚 Requires Manual Fix (See SOLUTIONS.md):
- **Level 2**: Custom Hook, useCallback, Memory Leak, Stale Closure
- **Level 3**: Reducer Logic, Context Optimization, Multiple Contexts, Complex State
- **Level 4**: All performance challenges (6 total)
- **Level 5**: Render Props, HOC, Portal, Error Boundary, Ref Forwarding

---

## Step-by-Step Usage

### Using Python Solver (Recommended):

1. **Run the solver:**
   ```bash
   python3 solve-challenges.py
   ```

2. **Confirm when prompted:**
   ```
   Do you want to continue? (yes/no): yes
   ```

3. **Wait for completion** (takes ~30 seconds)

4. **Check results:**
   ```bash
   cat SOLVED_FLAGS.txt
   ```

5. **Start the app:**
   ```bash
   npm start
   ```

6. **Submit flags** through the UI to verify they work!

---

## Backup & Restore

### Automatic Backup
Both scripts automatically create a backup before making changes:
```
challenge_backups_YYYYMMDD_HHMMSS/
└── challenges/
    ├── level1/
    ├── level2/
    ├── level3/
    ├── level4/
    └── level5/
```

### Restore Original Challenges
If you want to restore the original buggy versions:

```bash
# Replace with your actual backup directory name
cp -r challenge_backups_20250127_123456/challenges src/
```

Or manually:
```bash
git checkout src/challenges/
```

---

## Generated Files

After running either solver, you'll get:

1. **`SOLVED_FLAGS.txt`** - Complete list of all 28 flags
2. **`challenge_backups_*/`** - Backup of original files

---

## Testing the Solutions

### Quick Test:
```bash
# Start the app
npm start

# Open browser to http://localhost:3000

# Navigate through levels:
# - Level 1 → All 5 challenges should show flags
# - Level 2 → First 2 challenges should show flags
# - Level 3 → First challenge should show flag
# - Level 5 → First challenge should show flag
```

### Verify Build:
```bash
npm run build
```

Should complete successfully with only warnings (intentional bugs in unsolved challenges).

---

## Example Output

```
╔═══════════════════════════════════════════════════════════════╗
║        🚀 React Developer Challenge - Auto Solver 🚀         ║
╚═══════════════════════════════════════════════════════════════╝

⚠️  WARNING: This will modify your challenge files!
   A backup will be created automatically.

Do you want to continue? (yes/no): yes

[1/5] Creating backup...
✅ Backup created: challenge_backups_20250127_123456

[2/5] Applying fixes...

  Solving LEVEL1:
    ✓ Counter Bug - FLAG_1_COUNTER_a3f8b2c1
    ✓ Event Handler - FLAG_1_EVENTS_9f3d8a7e
    ✓ List Rendering - FLAG_1_KEYS_2b8c5f1a
    ✓ Props Handling - FLAG_1_PROPS_4c7e2a9f
    ✓ Form State - FLAG_1_FORM_6d9e3a4f

  Solving LEVEL2:
    ✓ useEffect Dependencies - FLAG_2_DEPS_f8a3c9d2
    ✓ Infinite Loop - FLAG_2_LOOP_7e9b4f1c

[3/5] Generating flags file...
✅ Flags file created: SOLVED_FLAGS.txt

[4/5] Verifying build...
✅ Build successful

[5/5] Complete!

╔═══════════════════════════════════════════════════════════════╗
║                   🎉 SOLVER COMPLETE! 🎉                     ║
╠═══════════════════════════════════════════════════════════════╣
║  ✅ Applied fixes: 9 challenges                              ║
║                                                               ║
║  📁 Backup: challenge_backups_20250127_123456                ║
║  🚩 Flags: SOLVED_FLAGS.txt                                  ║
║                                                               ║
║  Next steps:                                                  ║
║  1. Run 'npm start' to see solved challenges                 ║
║  2. Check SOLVED_FLAGS.txt for all flags                     ║
║  3. See SOLUTIONS.md for detailed explanations               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Troubleshooting

### "Permission denied" error:
```bash
chmod +x solve-all-challenges.sh
chmod +x solve-challenges.py
```

### "python3: command not found":
Use bash version instead:
```bash
./solve-all-challenges.sh
```

### Build fails after solving:
This is expected for challenges that weren't automatically fixed. Check:
```bash
npm run lint
```

### Want to solve everything manually?
Don't run the solver! Use:
- `SOLUTIONS.md` - Detailed solutions for all challenges
- `HOW_TO_VERIFY.md` - Manual testing guide
- `CHALLENGE_VERIFICATION.md` - Challenge-by-challenge checklist

---

## Files Overview

| File | Purpose |
|------|---------|
| `solve-challenges.py` | Python auto-solver (recommended) |
| `solve-all-challenges.sh` | Bash auto-solver (alternative) |
| `SOLVED_FLAGS.txt` | Generated list of all flags |
| `challenge_backups_*/` | Backup directories |
| `SOLUTIONS.md` | Complete manual solutions |
| `HOW_TO_VERIFY.md` | Manual verification guide |

---

## Why Not All Challenges?

Some challenges are too complex for simple find-and-replace:

1. **Custom Hooks** - Require new hook implementation
2. **Performance** - Need profiling and optimization logic
3. **Advanced Patterns** - Complex component restructuring

For these, refer to `SOLUTIONS.md` for detailed step-by-step solutions.

---

## Quick Commands

```bash
# Solve challenges
python3 solve-challenges.py

# Start app
npm start

# View all flags
cat SOLVED_FLAGS.txt

# Restore originals
git checkout src/challenges/

# Verify build
npm run build

# Run tests
npm test
```

---

## Need Help?

- **For challenge solutions**: See `SOLUTIONS.md`
- **For manual testing**: See `HOW_TO_VERIFY.md`
- **For verification**: See `CHALLENGE_VERIFICATION.md`
- **For automated verification**: Run `./verify-challenges.sh`

---

**Happy solving! 🚀**

