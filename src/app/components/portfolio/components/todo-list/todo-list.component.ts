import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterEnum, Todo } from '../../../../types/header';
import { Helpers } from '../../../../helpers/helpers';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})

export class TodoList {
    todos: Todo[] = [];
    _value: string = '';
    _editedValue = '';
    isEdit = false;
    filterEnum = FilterEnum;
    curFilter = FilterEnum.all;
    activeCounts = 0;

    @ViewChild('input') input!: ElementRef;
    @ViewChild('inputToEdit') inputToEdit!: ElementRef;

    get countsText() {
        return this.activeCounts <= 1 ? 'todo' : 'todos'
    }

    ngAfterViewInit() {
        this.input.nativeElement.focus();
    }

    handleEdit(id: string) {
        this.inputToEdit?.nativeElement.focus()
        this.todos.map((todo) => todo.id === id ? todo.isEdit = true : '')
    }

    toggleTodo(id: string) {
        this.todos.map((todo) => {
            todo.id === id ? todo.isChecked = !todo.isChecked : ''
        })
        console.log('todos', this.todos);
        this.activeCounts = this.todos.filter(todo => todo.isChecked).length
    }

    handleEnterEdit(id: string) {
        this.todos = this.todos.map(todo => todo.id === id
            ? todo = { label: this._editedValue, id: todo.id, isEdit: false, isChecked: false }
            : todo
        )
        this.activeCounts = this.todos.filter(todo => todo.isChecked).length
        this._editedValue = '';
    }

    handleEnter() {
        this.todos.push({ label: this._value, id: Helpers.generateID(), isEdit: false, isChecked: false })
        this._value = ''
    }

    handleDelete(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    filterdTodos(value: FilterEnum) {
        switch (value) {
            case 'all':
                return this.todos;
            case 'completed':
                return this.todos.filter(todo => todo.isChecked === true);
            default:
                return [];
        }
    }

    changeFilter(value: FilterEnum) {
        this.curFilter = value;
    }

}