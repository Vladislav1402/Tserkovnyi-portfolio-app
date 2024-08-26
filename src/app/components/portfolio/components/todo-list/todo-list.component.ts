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
       
        const todo = this.todos.find(todo => todo.id === id)
        this._editedValue = todo ? todo.label : ''
        this.todos.map((todo, i) => {
            todo.id === id ? (todo.isEdit = true) && (this._editedValue = todo.label) : todo.isEdit = false;
        })

        setTimeout(() => {
            this.inputToEdit?.nativeElement.focus()
        });
    }

    toggleTodo(id: string) {
        this.todos.map((todo) => {
            todo.id === id ? todo.isChecked = !todo.isChecked : ''
        })
        this.getActiveCounts()
    }

    handleEnterEdit(id: string) {
        this.todos = this.todos.map(todo => todo.id === id
            ? todo = { label: this._editedValue, id: todo.id, isEdit: false, isChecked: false }
            : todo
        )
        this.getActiveCounts()
        this._editedValue = '';
    }

    handleEnter() {
        this.todos.push({ label: this._value, id: Helpers.generateID(), isEdit: false, isChecked: false })
        this._value = ''
    }

    getActiveCounts() {
        this.activeCounts = this.todos.filter(todo => todo.isChecked).length
    }

    handleDelete(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.getActiveCounts()
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