/* Data structures & algorithms — original InfoparkDaily lessons. Examples are Python and run in the browser (Pyodide). */

const PYDOCS = "https://docs.python.org/3/";

export const DSA_TRACK = {
  key: "dsa",
  name: "DSA",
  long: "Data structures & algorithms — crack the coding round",
  color: "#7c3aed",
  tagline: "Patterns for coding interviews, in Python.",
  level: "Intermediate",
  lang: "python",
  feature: "Runnable Python solutions",
  heroLine: "Every lesson has a runnable Python solution you can edit and test",
  lessons: [
    {
      slug: "big-o",
      title: "Big-O & complexity",
      summary: "Measuring how time and memory grow with input size.",
      body: `<p>Interviewers care less about whether code works on 5 items and more about how it behaves on 5 million. <strong>Big-O</strong> describes how the number of steps grows as the input size <em>n</em> grows, ignoring constants.</p>
<table class="ln-table"><thead><tr><th>Big-O</th><th>Name</th><th>Typical example</th></tr></thead><tbody>
<tr><td>O(1)</td><td>Constant</td><td>Read <code>arr[i]</code>, dict lookup</td></tr>
<tr><td>O(log n)</td><td>Logarithmic</td><td>Binary search</td></tr>
<tr><td>O(n)</td><td>Linear</td><td>One loop over the data</td></tr>
<tr><td>O(n log n)</td><td>Linearithmic</td><td>Good sorting algorithms</td></tr>
<tr><td>O(n²)</td><td>Quadratic</td><td>Nested loops over the same data</td></tr>
<tr><td>O(2ⁿ)</td><td>Exponential</td><td>Trying every subset</td></tr>
</tbody></table>
<p><strong>Space complexity</strong> counts extra memory the same way. Always state both, e.g. “O(n) time, O(1) extra space”.</p>`,
      example: `import time

def has_duplicate_slow(nums):          # O(n^2): compares every pair
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False

def has_duplicate_fast(nums):          # O(n): one pass with a set
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False

data = list(range(3000))               # no duplicates: worst case
for fn in (has_duplicate_slow, has_duplicate_fast):
    start = time.perf_counter()
    result = fn(data)
    ms = (time.perf_counter() - start) * 1000
    print(f"{fn.__name__}: {result}  in {ms:.1f} ms")`,
      points: ["Big-O = growth rate, constants dropped.", "Nested loops over n items ≈ O(n²).", "A set/dict often turns O(n²) into O(n)."],
      practice: "Change the data size to 6000 and compare: the slow version should take roughly 4× longer, the fast one about 2×. Explain why.",
      quiz: { q: "What is the time complexity of binary search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 1, why: "Each step halves the remaining range, so it takes about log₂ n steps." },
      interview: [
        ["What's the complexity of two separate (not nested) loops over n?", "O(n) + O(n) = O(2n), which simplifies to O(n)."],
        ["Is O(n log n) always slower than O(n²)?", "No — for large n, O(n log n) grows much more slowly. For tiny inputs constants can dominate, which is why some libraries switch to insertion sort for small arrays."]
      ],
      further: [["Python: Time complexity notes (wiki)", "https://wiki.python.org/moin/TimeComplexity"]]
    },
    {
      slug: "arrays-two-pointers",
      title: "Arrays & two pointers",
      summary: "Solving array problems in one pass with two moving indexes.",
      body: `<p>The <strong>two-pointer</strong> technique keeps two indexes that move towards each other or in the same direction, avoiding a nested loop.</p>
<ul>
<li><strong>Opposite ends</strong> — sorted pair sum, palindrome check, reversing in place.</li>
<li><strong>Slow/fast</strong> — removing duplicates from a sorted array, moving zeros to the end.</li>
</ul>
<p>A close cousin is the <strong>sliding window</strong>: keep a window <code>[left, right]</code> and update a running sum or count as it slides, e.g. “maximum sum of k consecutive days”.</p>`,
      example: `def pair_with_sum(sorted_nums, target):
    left, right = 0, len(sorted_nums) - 1
    while left < right:
        total = sorted_nums[left] + sorted_nums[right]
        if total == target:
            return sorted_nums[left], sorted_nums[right]
        if total < target:
            left += 1
        else:
            right -= 1
    return None

def is_palindrome(text):
    chars = [c.lower() for c in text if c.isalnum()]
    i, j = 0, len(chars) - 1
    while i < j:
        if chars[i] != chars[j]:
            return False
        i, j = i + 1, j - 1
    return True

def max_window_sum(nums, k):            # sliding window
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best

print(pair_with_sum([1, 3, 4, 6, 8, 11], 10))
print(is_palindrome("Malayalam"))
print(max_window_sum([2, 1, 5, 1, 3, 2], 3))`,
      points: ["Two pointers turn many O(n²) pair searches into O(n).", "Opposite-end pointers need sorted data.", "Sliding window = add the new item, remove the old one."],
      practice: "Write move_zeros(nums) that moves all 0s to the end in place while keeping the order of other numbers.",
      quiz: { q: "Why must the array be sorted for the opposite-ends pair-sum method?", options: ["To save memory", "So moving a pointer predictably increases or decreases the sum", "Python requires it", "It doesn't need to be"], answer: 1, why: "Sorting guarantees moving left increases the sum and moving right decreases it." },
      interview: [
        ["How would you find two numbers summing to a target in an unsorted array?", "Use a dict of value → index: for each x, check if target − x is already in it. O(n) time, O(n) space."],
        ["What is the sliding window pattern?", "Maintaining a contiguous range and updating its state incrementally as it expands/shrinks, instead of recomputing from scratch."]
      ],
      further: [["Python: Lists", PYDOCS + "tutorial/datastructures.html#more-on-lists"]]
    },
    {
      slug: "hashing",
      title: "Hash maps & sets",
      summary: "Constant-time lookups for counting, grouping and finding pairs.",
      body: `<p>A <strong>hash map</strong> (Python <code>dict</code>) and <strong>hash set</strong> (<code>set</code>) find, add and remove items in O(1) average time by hashing the key to a storage slot.</p>
<p>Recognise these patterns:</p>
<ul>
<li><strong>Counting</strong> — word frequencies, most common skill (<code>collections.Counter</code>).</li>
<li><strong>Seen-before</strong> — duplicates, first repeating character, two-sum.</li>
<li><strong>Grouping</strong> — anagrams grouped by sorted letters (<code>defaultdict(list)</code>).</li>
</ul>
<p>Keys must be hashable (immutable): strings, numbers, tuples — not lists.</p>`,
      example: `from collections import Counter, defaultdict

def two_sum(nums, target):
    index_of = {}
    for i, x in enumerate(nums):
        if target - x in index_of:
            return index_of[target - x], i
        index_of[x] = i
    return None

def first_unique_char(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i, ch
    return None

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())

print(two_sum([7, 2, 11, 15, 4], 6))
print(first_unique_char("infoparkdaily"))
print(group_anagrams(["listen", "silent", "enlist", "kochi", "chiko"]))
print(Counter("python sql python git sql python".split()).most_common(2))`,
      points: ["dict/set give O(1) average lookups.", "Counter for frequencies; defaultdict for grouping.", "Trade extra memory for speed."],
      practice: "Return the length of the longest substring without repeating characters (hint: dict of last seen index + sliding window).",
      quiz: { q: "Which cannot be a dict key in Python?", options: ["\"kochi\"", "42", "(1, 2)", "[1, 2]"], answer: 3, why: "Lists are mutable and unhashable; tuples of immutables are fine." },
      interview: [
        ["How does a hash map handle collisions?", "Two keys landing in the same slot are resolved by chaining (a list per bucket) or open addressing (probing for another slot). Python dicts use open addressing."],
        ["When is a hash map lookup not O(1)?", "In the worst case — many collisions — it degrades to O(n); resizing also costs O(n) occasionally, though amortised cost stays O(1)."]
      ],
      further: [["Python: collections module", PYDOCS + "library/collections.html"]]
    },
    {
      slug: "stacks-queues",
      title: "Stacks & queues",
      summary: "LIFO and FIFO structures and the problems they solve.",
      body: `<ul>
<li><strong>Stack</strong> — Last In, First Out. Push and pop at one end. In Python, a list's <code>append</code>/<code>pop</code> are O(1). Used for undo, matching brackets, depth-first search, evaluating expressions.</li>
<li><strong>Queue</strong> — First In, First Out. Use <code>collections.deque</code> with <code>append</code>/<code>popleft</code> (O(1)); a list's <code>pop(0)</code> is O(n). Used for task processing and breadth-first search.</li>
<li><strong>Monotonic stack</strong> — keeps items in increasing/decreasing order to answer “next greater element” in O(n).</li>
</ul>`,
      example: `from collections import deque

def balanced(expr):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in expr:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

def next_greater(nums):                 # monotonic stack, O(n)
    result = [-1] * len(nums)
    stack = []                          # indexes waiting for a bigger number
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result

print(balanced("{[()()]}"), balanced("([)]"))
print(next_greater([4, 5, 2, 25, 7]))

queue = deque(["resume", "aptitude", "technical", "hr"])
while queue:
    print("Round:", queue.popleft())`,
      points: ["Stack = LIFO (list append/pop).", "Queue = FIFO (deque append/popleft).", "Monotonic stacks solve 'next greater' in O(n)."],
      practice: "Implement a queue using two stacks with enqueue and dequeue methods, and test it with 5 operations.",
      quiz: { q: "Which structure processes items in the order they arrived?", options: ["Stack", "Queue", "Set", "Heap"], answer: 1, why: "A queue is first-in, first-out." },
      interview: [
        ["Why not use list.pop(0) for a queue?", "It shifts every remaining element — O(n). deque.popleft() is O(1)."],
        ["How would you design a min-stack with O(1) getMin?", "Keep a second stack of current minimums; push the new min on every push and pop both together."]
      ],
      further: [["Python: deque", PYDOCS + "library/collections.html#collections.deque"]]
    },
    {
      slug: "linked-lists",
      title: "Linked lists",
      summary: "Nodes and pointers: reversing, finding the middle and detecting cycles.",
      body: `<p>A <strong>linked list</strong> is a chain of nodes; each node stores a value and a reference to the next node. Inserting or removing at a known node is O(1), but reaching the k-th item is O(k) because you must walk from the head.</p>
<p>Classic interview techniques:</p>
<ul>
<li><strong>Reverse</strong> by re-pointing each node's <code>next</code> using <code>prev</code>, <code>curr</code> pointers.</li>
<li><strong>Fast/slow pointers</strong> — the slow pointer moves 1 step, the fast moves 2: when fast reaches the end, slow is at the middle; if they ever meet, there's a cycle (Floyd's algorithm).</li>
<li>A <strong>dummy head</strong> node simplifies edge cases when merging or deleting.</li>
</ul>`,
      example: `class Node:
    def __init__(self, val, next=None):
        self.val, self.next = val, next

def build(values):
    head = None
    for v in reversed(values):
        head = Node(v, head)
    return head

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev

def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow.val

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False

lst = build([1, 2, 3, 4, 5])
print("middle:", middle(lst))
print("reversed:", to_list(reverse(lst)))

loop = build([1, 2, 3])
loop.next.next.next = loop.next          # 3 -> 2 creates a cycle
print("cycle:", has_cycle(loop), has_cycle(build([1, 2])))`,
      points: ["Access by position is O(n); insert at a known node is O(1).", "Reverse with prev/curr pointers.", "Fast/slow pointers find the middle and cycles."],
      practice: "Write merge_sorted(a, b) that merges two sorted linked lists into one sorted list using a dummy head.",
      quiz: { q: "In Floyd's algorithm, how far does the fast pointer move each step?", options: ["1 node", "2 nodes", "Half the list", "To the end"], answer: 1, why: "Fast moves two nodes per step and slow moves one; they meet only if there's a cycle." },
      interview: [
        ["Array vs linked list?", "Arrays give O(1) index access and are cache-friendly; inserting in the middle is O(n). Linked lists insert/delete at a known node in O(1) but need O(n) to reach a position."],
        ["How do you find the k-th node from the end in one pass?", "Move a fast pointer k steps ahead, then move both pointers together; when fast reaches the end, slow is k-th from the end."]
      ],
      further: [["Python: Classes", PYDOCS + "tutorial/classes.html"]]
    },
    {
      slug: "recursion",
      title: "Recursion & backtracking",
      summary: "Functions that call themselves, base cases, memoisation and generating combinations.",
      body: `<p>A <strong>recursive</strong> function solves a problem by calling itself on a smaller version of it. Every recursive function needs:</p>
<ol>
<li>a <strong>base case</strong> that returns without recursing, and</li>
<li>a <strong>recursive case</strong> that moves towards the base case.</li>
</ol>
<p>Repeated sub-problems (like Fibonacci) explode exponentially — cache results with <strong>memoisation</strong> (<code>functools.lru_cache</code>) to make them linear. This is the start of <em>dynamic programming</em>.</p>
<p><strong>Backtracking</strong> builds a solution step by step, undoing a choice (“backtracking”) when it can't lead to an answer — used for subsets, permutations and puzzles.</p>`,
      example: `from functools import lru_cache

def factorial(n):
    if n <= 1:                      # base case
        return 1
    return n * factorial(n - 1)     # smaller problem

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

def subsets(items):
    result, current = [], []
    def go(i):
        if i == len(items):
            result.append(current[:])
            return
        current.append(items[i])    # choose
        go(i + 1)
        current.pop()               # un-choose (backtrack)
        go(i + 1)
    go(0)
    return result

print(factorial(6))
print(fib(50))
print(subsets(["SQL", "Git", "Py"]))`,
      points: ["Always define the base case first.", "Memoise overlapping sub-problems.", "Backtracking = choose, explore, un-choose."],
      practice: "Write permutations(s) that returns every ordering of the letters in a short string such as \"abc\".",
      quiz: { q: "What happens if a recursive function has no reachable base case?", options: ["It returns None", "It runs forever until a recursion limit/stack overflow", "Python fixes it automatically", "It becomes a loop"], answer: 1, why: "Without a base case the calls never stop, and Python raises RecursionError." },
      interview: [
        ["Recursion vs iteration?", "Recursion is often clearer for trees and divide-and-conquer but uses call-stack memory; iteration avoids stack limits. Most recursion can be rewritten with an explicit stack."],
        ["What is memoisation?", "Caching the results of function calls by their arguments so repeated sub-problems are computed once — top-down dynamic programming."]
      ],
      further: [["Python: functools.lru_cache", PYDOCS + "library/functools.html#functools.lru_cache"]]
    },
    {
      slug: "binary-search",
      title: "Binary search",
      summary: "Halving the search space on sorted data — and on answers.",
      body: `<p>On sorted data, <strong>binary search</strong> checks the middle element and discards the half that can't contain the target, giving O(log n). A million items need at most about 20 checks.</p>
<p>Get the details right — they are where interview bugs hide:</p>
<ul>
<li>Loop while <code>lo &lt;= hi</code> for an exact-match search.</li>
<li>Compute <code>mid = (lo + hi) // 2</code>.</li>
<li>Move <code>lo = mid + 1</code> or <code>hi = mid - 1</code> so the range always shrinks.</li>
</ul>
<p><strong>Binary search on the answer</strong>: when “can we do it with X?” is false up to some point and true after, search for the smallest X that works — e.g. minimum daily capacity to finish tasks in D days. Python's <code>bisect</code> module does insert-position searches.</p>`,
      example: `import bisect

def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

def min_daily_capacity(tasks, days):
    """Smallest capacity so tasks (in order) finish within 'days'."""
    def can(cap):
        used, load = 1, 0
        for t in tasks:
            if load + t > cap:
                used, load = used + 1, 0
            load += t
        return used <= days
    lo, hi = max(tasks), sum(tasks)
    while lo < hi:
        mid = (lo + hi) // 2
        if can(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

salaries = [3, 4, 6, 8, 12, 15, 20]
print(binary_search(salaries, 12), binary_search(salaries, 7))
print("insert 7 at index", bisect.bisect_left(salaries, 7))
print(min_daily_capacity([3, 2, 2, 4, 1, 4], 3))`,
      points: ["Requires sorted data (or a monotonic yes/no answer).", "O(log n) — each step halves the range.", "Watch loop condition and mid ± 1 updates."],
      practice: "Write first_occurrence(nums, target) that returns the index of the first copy of target in a sorted list with duplicates.",
      quiz: { q: "About how many steps does binary search need for 1,000,000 sorted items?", options: ["~20", "~1,000", "~500,000", "~1,000,000"], answer: 0, why: "log₂(1,000,000) ≈ 20." },
      interview: [
        ["Why use lo + (hi - lo) // 2 in some languages?", "In languages with fixed-size integers (Java, C++), lo + hi can overflow. Python integers don't overflow, but the habit is good."],
        ["What does 'binary search on the answer' mean?", "Searching over possible answer values instead of array indexes, using a feasibility check that is false then true as the value grows."]
      ],
      further: [["Python: bisect module", PYDOCS + "library/bisect.html"]]
    },
    {
      slug: "sorting",
      title: "Sorting algorithms",
      summary: "Bubble, merge and quick sort, stability, and using Python's sort with keys.",
      body: `<p>You'll rarely write a sort at work — Python's built-in <code>sorted()</code> (Timsort, O(n log n), stable) is excellent — but interviews test whether you understand how sorting works.</p>
<ul>
<li><strong>Bubble/insertion sort</strong> — O(n²); insertion sort is fast on nearly-sorted or tiny data.</li>
<li><strong>Merge sort</strong> — divide in halves, sort each, merge. Always O(n log n), stable, needs O(n) extra space.</li>
<li><strong>Quick sort</strong> — partition around a pivot. O(n log n) on average, O(n²) worst case, in place.</li>
<li><strong>Stable</strong> sorts keep equal items in their original order — important when sorting by several keys.</li>
</ul>
<p>Sort by multiple fields with a key tuple: <code>sorted(jobs, key=lambda j: (-j["lpa"], j["title"]))</code>.</p>`,
      example: `def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left, right = merge_sort(nums[:mid]), merge_sort(nums[mid:])
    merged, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    return merged + left[i:] + right[j:]

def quick_sort(nums):
    if len(nums) <= 1:
        return nums
    pivot = nums[len(nums) // 2]
    return (quick_sort([x for x in nums if x < pivot])
            + [x for x in nums if x == pivot]
            + quick_sort([x for x in nums if x > pivot]))

data = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(data))
print(quick_sort(data))

jobs = [
    {"title": "QA", "lpa": 4}, {"title": "Data", "lpa": 6},
    {"title": "Android", "lpa": 6}, {"title": "DevOps", "lpa": 12},
]
for j in sorted(jobs, key=lambda j: (-j["lpa"], j["title"])):
    print(j["lpa"], j["title"])`,
      points: ["Built-in sorted() is O(n log n) and stable.", "Merge sort: guaranteed O(n log n), extra space.", "Quick sort: fast on average, O(n²) worst case."],
      practice: "Sort a list of (name, score) tuples by score descending, then name ascending, using one sorted() call.",
      quiz: { q: "Which sort guarantees O(n log n) in the worst case?", options: ["Quick sort", "Bubble sort", "Merge sort", "Insertion sort"], answer: 2, why: "Merge sort always splits evenly, so it's O(n log n) in every case." },
      interview: [
        ["What is a stable sort and why does it matter?", "It keeps equal elements in their original relative order, so you can sort by a secondary key first and then by the primary key."],
        ["How can quick sort avoid its O(n²) worst case?", "Choose pivots randomly or with median-of-three, and use three-way partitioning for many duplicates."]
      ],
      further: [["Python: Sorting HOW TO", PYDOCS + "howto/sorting.html"]]
    },
    {
      slug: "trees-graphs",
      title: "Trees & graphs: BFS and DFS",
      summary: "Traversing trees and graphs, shortest paths in unweighted graphs.",
      body: `<p>A <strong>tree</strong> is a hierarchy of nodes with one root and no cycles (folders, org charts, the HTML DOM). A <strong>binary search tree</strong> keeps smaller values on the left and larger on the right.</p>
<p>A <strong>graph</strong> is nodes connected by edges — cities and roads, people and connections. Store it as an <strong>adjacency list</strong>: a dict mapping each node to its neighbours.</p>
<ul>
<li><strong>DFS</strong> (depth-first) goes deep before wide — recursion or a stack. Good for exploring all paths, detecting cycles, counting connected parts.</li>
<li><strong>BFS</strong> (breadth-first) visits level by level with a queue — gives the <em>shortest path</em> in an unweighted graph.</li>
</ul>
<p>Always track <code>visited</code> nodes in a graph to avoid infinite loops.</p>`,
      example: `from collections import deque

# Binary tree as nested tuples: (value, left, right)
tree = (8, (3, (1, None, None), (6, None, None)), (10, None, (14, None, None)))

def inorder(node):                      # DFS: left, root, right
    if not node:
        return []
    val, left, right = node
    return inorder(left) + [val] + inorder(right)

def height(node):
    return 0 if not node else 1 + max(height(node[1]), height(node[2]))

roads = {
    "Kochi": ["Thrissur", "Alappuzha"],
    "Thrissur": ["Kochi", "Palakkad", "Kozhikode"],
    "Alappuzha": ["Kochi", "Kollam"],
    "Kollam": ["Alappuzha", "Thiruvananthapuram"],
    "Palakkad": ["Thrissur"],
    "Kozhikode": ["Thrissur", "Kannur"],
    "Kannur": ["Kozhikode"],
    "Thiruvananthapuram": ["Kollam"],
}

def shortest_path(graph, start, goal):  # BFS
    queue = deque([[start]])
    visited = {start}
    while queue:
        path = queue.popleft()
        if path[-1] == goal:
            return path
        for nxt in graph[path[-1]]:
            if nxt not in visited:
                visited.add(nxt)
                queue.append(path + [nxt])
    return None

print(inorder(tree), "height:", height(tree))
print(" -> ".join(shortest_path(roads, "Kannur", "Thiruvananthapuram")))`,
      points: ["Adjacency list = dict of neighbours.", "BFS + queue = shortest path (unweighted).", "DFS + recursion/stack = explore deeply; track visited."],
      practice: "Write count_islands(grid) that counts groups of connected 1s (up/down/left/right) in a 2-D list using DFS.",
      quiz: { q: "Which traversal finds the shortest path in an unweighted graph?", options: ["DFS", "BFS", "Inorder", "Random walk"], answer: 1, why: "BFS explores in order of distance, so the first time it reaches the goal is via a shortest path." },
      interview: [
        ["Why does inorder traversal of a BST give sorted output?", "BST rules put smaller keys in the left subtree and larger in the right, so visiting left, node, right outputs keys in ascending order."],
        ["BFS vs DFS memory use?", "BFS stores a whole frontier level (can be wide); DFS stores the current path (can be deep). Choose based on the graph's shape and what you need."]
      ],
      further: [["Python: collections.deque", PYDOCS + "library/collections.html#collections.deque"]]
    }
  ]
};
