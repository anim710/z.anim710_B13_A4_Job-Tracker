
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
-getElementById is the simplest and fastest one. we give it an id (like "myButton") and it gives us exactly one element back — or null if nothing is found. It only works with id.
getElementsByClassName we give it a class name (like "product-card") and it returns something called an HTMLCollection — kind of like an array, but not a real array — with all elements that have that class. Even if there’s only one, it still gives us a collection.
querySelector and querySelectorAll are the cool modern ones. They work like CSS selectors. So querySelector(".product-card") gives us the first element that matches. querySelectorAll(".product-card") gives us all of them in a NodeList (again, array-like). The nice thing is we can do very powerful things like querySelector("#header .logo img") or querySelectorAll("button[data-action='delete']") — basically anything we can write in CSS.
### 2. How do you create and insert a new element into the DOM?
-First we create the element with document.createElement(). Example:
const newDiv = document.createElement("div");
Now it exists in JavaScript memory… but it’s not on the page yet.
Then we usually do three things:
a: give it some content → newDiv.textContent = "Hello I’m new here!";
or → newDiv.innerHTML = "Hello I’m new!";
b: maybe add classes, ids, attributes → newDiv.classList.add("alert", "success");
c: then attach it to the page with one of these like parent.appendChild(newDiv) → adds it as the last child
### 3. What is Event Bubbling? And how does it work?
-imagine we click on a tiny emoji button that’s sitting inside a card, and that card is inside a big box. When we click the emoji, JavaScript doesn’t just say “oh only the emoji was clicked”. The click actually starts at the emoji, then it travels UP like a bubble in soda — first to the card, then to the big box, then even higher to the whole page. That “bubbling up” is called event bubbling. So if we put a click listener on the card or the big box, it will still catch the click that started on the little emoji — because the event keeps going up until someone stops it or it reaches the top.
### 4. What is Event Delegation in JavaScript? Why is it useful?
-Event delegation is a smart shortcut. Instead of putting a click listener on every single “delete” button in our to-do list (which could be 5 today and 50 tomorrow), we just put one listener on their parent — like the whole list container. Then when someone clicks anything inside the list, we look at what was actually clicked (using e.target). If it’s a delete button, we delete that item. it is useful because we write way less code,New items added later still work perfectly without adding new listeners,It’s faster when you have tons of items
It’s like putting one security guard at the gate instead of one guard on every single door.
### 5. What is the difference between preventDefault() and stopPropagation() methods?
-preventDefault() stops the normal thing the browser wants to do. Like if we click a link, normally the page jumps away — preventDefault() says “nope, don’t go anywhere”. Or if it’s a form submit button, preventDefault() stops the page from refreshing. It only stops the browser’s default action — the click still bubbles up to parents.
stopPropagation() stops the event from traveling (bubbling) any higher. So if we click a small button inside a big card, and we call stopPropagation() on the button, the card’s click code won’t run at all — the event dies right there and doesn’t go up.
