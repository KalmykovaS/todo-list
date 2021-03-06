'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const getStorage = function() {
    let data = localStorage.getItem('todo');
    return data ? JSON.parse(data) : [];
};
const todoData = getStorage();
const setStorage = () => localStorage.setItem('todo', JSON.stringify(todoData));

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        console.log(item);
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            setStorage();
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        if (btnTodoRemove) {
            btnTodoRemove.addEventListener('click', function() {
                let currentItem = todoData.indexOf(item);
                console.log(currentItem);
                todoData.splice(currentItem, 1);
                render();
            });
        }
        setStorage();
    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value.trim() !== '') {
        todoData.push(newTodo);
        render();
    } else {
        alert('?????????????? ????????????????');
    }

    headerInput.value = '';

    setStorage();
});

render();