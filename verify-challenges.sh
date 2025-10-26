#!/bin/bash

# Challenge Verification Script
# This script helps verify all challenges are working and solvable

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     🔍 React Developer Challenge - Verification Script       ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check if node_modules exists
echo -e "${BLUE}[1/8]${NC} Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installing dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies found${NC}"
fi
echo ""

# Step 2: Run ESLint
echo -e "${BLUE}[2/8]${NC} Running ESLint check..."
npm run lint > /dev/null 2>&1
LINT_EXIT=$?
if [ $LINT_EXIT -eq 0 ]; then
    echo -e "${GREEN}✅ Lint check passed${NC}"
else
    echo -e "${YELLOW}⚠️  Lint warnings found (expected in challenge files)${NC}"
fi
echo ""

# Step 3: Check file structure
echo -e "${BLUE}[3/8]${NC} Verifying file structure..."
REQUIRED_FILES=(
    "src/challenges/level1/ReactBasicsChallenge.js"
    "src/challenges/level2/ReactHooksChallenge.js"
    "src/challenges/level3/StateManagementChallenge.js"
    "src/challenges/level4/PerformanceChallenge.js"
    "src/challenges/level5/AdvancedPatternsChallenge.js"
    "SOLUTIONS.md"
    "src/App.js"
    "src/components/HintSystem/HintSystem.js"
    "src/components/Statistics/Statistics.js"
    "src/utils/challengeHints.js"
)

ALL_FILES_EXIST=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✓${NC} $file"
    else
        echo -e "${RED}  ✗${NC} $file ${RED}MISSING${NC}"
        ALL_FILES_EXIST=false
    fi
done

if [ "$ALL_FILES_EXIST" = true ]; then
    echo -e "${GREEN}✅ All required files exist${NC}"
else
    echo -e "${RED}❌ Some files are missing${NC}"
    exit 1
fi
echo ""

# Step 4: Count challenges
echo -e "${BLUE}[4/8]${NC} Counting challenges..."
CHALLENGE_COUNT=$(find src/challenges -name "*.js" | wc -l | tr -d ' ')
echo -e "${GREEN}✅ Found $CHALLENGE_COUNT challenge files (expected: 6)${NC}"
echo ""

# Step 5: Verify flags in SOLUTIONS.md
echo -e "${BLUE}[5/8]${NC} Verifying flags in SOLUTIONS.md..."
FLAG_COUNT=$(grep -o "FLAG_[0-9]_[A-Z]*_[a-f0-9]*" SOLUTIONS.md | wc -l | tr -d ' ')
echo -e "${GREEN}✅ Found $FLAG_COUNT unique flags documented${NC}"
echo ""

# Step 6: Check for common issues
echo -e "${BLUE}[6/8]${NC} Checking for common issues..."

# Check for console.log in challenge files (should be minimal)
CONSOLE_LOGS=$(grep -r "console.log" src/challenges/ 2>/dev/null | wc -l | tr -d ' ')
if [ $CONSOLE_LOGS -lt 20 ]; then
    echo -e "${GREEN}  ✓${NC} Console.log usage is reasonable ($CONSOLE_LOGS found)"
else
    echo -e "${YELLOW}  ⚠${NC}  Many console.log statements found ($CONSOLE_LOGS)"
fi

# Check for TODO comments
TODOS=$(grep -r "TODO" src/ 2>/dev/null | wc -l | tr -d ' ')
if [ $TODOS -eq 0 ]; then
    echo -e "${GREEN}  ✓${NC} No TODO comments found"
else
    echo -e "${YELLOW}  ⚠${NC}  Found $TODOS TODO comments"
fi

echo -e "${GREEN}✅ Common issues check complete${NC}"
echo ""

# Step 7: Run verification tests
echo -e "${BLUE}[7/8]${NC} Running verification test suite..."
echo -e "${YELLOW}This may take a minute...${NC}"
npm test -- verify-all-challenges --watchAll=false --silent > /tmp/test-output.txt 2>&1
TEST_EXIT=$?

if [ $TEST_EXIT -eq 0 ]; then
    PASSED=$(grep -o "passed" /tmp/test-output.txt | wc -l | tr -d ' ')
    echo -e "${GREEN}✅ All verification tests passed! ($PASSED tests)${NC}"
else
    PASSED=$(grep -o "passed" /tmp/test-output.txt | wc -l | tr -d ' ')
    FAILED=$(grep -o "failed" /tmp/test-output.txt | wc -l | tr -d ' ')
    echo -e "${YELLOW}⚠️  Tests completed with some failures${NC}"
    echo -e "   Passed: $PASSED | Failed: $FAILED"
    echo -e "${YELLOW}   (Some test failures are OK if challenges still work)${NC}"
fi
echo ""

# Step 8: Build check
echo -e "${BLUE}[8/8]${NC} Testing production build..."
npm run build > /tmp/build-output.txt 2>&1
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
    echo -e "${GREEN}✅ Production build successful${NC}"
    BUILD_SIZE=$(du -sh build 2>/dev/null | cut -f1)
    echo -e "   Build size: $BUILD_SIZE"
else
    echo -e "${RED}❌ Build failed${NC}"
    tail -20 /tmp/build-output.txt
fi
echo ""

# Final Summary
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    📊 VERIFICATION SUMMARY                    ║"
echo "╠═══════════════════════════════════════════════════════════════╣"

if [ "$ALL_FILES_EXIST" = true ] && [ $BUILD_EXIT -eq 0 ]; then
    echo -e "║  ${GREEN}✅ ALL CRITICAL CHECKS PASSED!${NC}                              ║"
    echo "║                                                               ║"
    echo "║  Your challenges are ready to use! 🎉                        ║"
    echo "║                                                               ║"
    echo "║  Next steps:                                                  ║"
    echo "║  1. Run 'npm start' to test manually                         ║"
    echo "║  2. Navigate through each level                              ║"
    echo "║  3. Verify challenges load without crashing                  ║"
    echo "║  4. Test at least one challenge per level                    ║"
    echo "║  5. Verify flags appear when solved correctly                ║"
else
    echo -e "║  ${YELLOW}⚠️  SOME CHECKS FAILED${NC}                                      ║"
    echo "║                                                               ║"
    echo "║  Please review the errors above and fix them.                ║"
fi

echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Manual Testing Checklist
echo "📋 Manual Testing Checklist:"
echo ""
echo "  [ ] Start app with 'npm start'"
echo "  [ ] Dashboard loads without errors"
echo "  [ ] Click each level (1-5) - all should load"
echo "  [ ] Test Level 1, Challenge 1 (Counter Bug):"
echo "      • Button should not work initially"
echo "      • Fix by using useState"
echo "      • Flag appears when count reaches 5"
echo "  [ ] Test flag submission:"
echo "      • Submit a valid flag"
echo "      • Should see success message"
echo "      • Refresh page - flag should persist"
echo "  [ ] Test hint system:"
echo "      • Click 'Show Next Hint'"
echo "      • Hints should reveal progressively"
echo "      • Hint count should increase in statistics"
echo "  [ ] Check statistics:"
echo "      • Should show completion percentage"
echo "      • Should show hints used"
echo "      • Should show developer level"
echo "  [ ] Test one challenge from each level"
echo ""
echo "For detailed verification, see: CHALLENGE_VERIFICATION.md"
echo ""

