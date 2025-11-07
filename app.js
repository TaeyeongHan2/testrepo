// DOM 요소 선택
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');
const currentDate = document.getElementById('currentDate');

// 상태 관리
let todos = [];
let currentFilter = 'all';

// 로컬스토리지 키
const STORAGE_KEY = 'todos';

// 초기화
function init() {
    displayCurrentDate();
    loadTodos();
    renderTodos();
    updateCount();
}

// 현재 날짜 표시
function displayCurrentDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    currentDate.textContent = now.toLocaleDateString('ko-KR', options);
}

// 로컬스토리지에서 할 일 불러오기
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            console.error('할 일 불러오기 실패:', e);
            todos = [];
        }
    }
}

// 로컬스토리지에 할 일 저장
function saveTodos() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
        console.error('할 일 저장 실패:', e);
        alert('저장 공간이 부족합니다. 완료된 항목을 삭제해주세요.');
    }
}

// 할 일 추가
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('할 일을 입력해주세요.');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.unshift(newTodo);
    saveTodos();
    renderTodos();
    updateCount();

    todoInput.value = '';
    todoInput.focus();
}

// 할 일 토글 (완료/미완료)
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        updateCount();
    }
}

// 할 일 삭제
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
    updateCount();
}

// 완료된 할 일 모두 삭제
function clearCompletedTodos() {
    const completedCount = todos.filter(t => t.completed).length;

    if (completedCount === 0) {
        alert('완료된 항목이 없습니다.');
        return;
    }

    if (confirm(`${completedCount}개의 완료된 항목을 삭제하시겠습니까?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
        updateCount();
    }
}

// 필터링된 할 일 가져오기
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// 할 일 렌더링
function renderTodos() {
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <p>${getEmptyMessage()}</p>
            </div>
        `;
        return;
    }

    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
        </li>
    `).join('');
}

// 빈 상태 메시지
function getEmptyMessage() {
    switch (currentFilter) {
        case 'active':
            return '진행중인 할 일이 없습니다.';
        case 'completed':
            return '완료된 할 일이 없습니다.';
        default:
            return '할 일을 추가해보세요!';
    }
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 할 일 개수 업데이트
function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount}개의 할 일`;
}

// 필터 변경
function setFilter(filter) {
    currentFilter = filter;

    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    renderTodos();
}

// 이벤트 리스너
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompleted.addEventListener('click', clearCompletedTodos);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// 앱 초기화
init();
