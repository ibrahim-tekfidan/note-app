import './App.css';
import { getCategories, getInitialNotes } from './FakeNoteServices';
import React, { Component } from 'react';
import Header from './components/header';
import Form from './components/form';
import Category from './components/categories';
import Note from './components/note';

class App extends Component {
  state = {
    categories: getCategories(),
    notes: getInitialNotes(),
    showForm: false,
    selectedCategory: null,
  };

  handleShowForm = () => {
    const updatedShowForm = !this.state.showForm;
    this.setState({
      showForm: updatedShowForm,
    });
  };

  handleDelete = note => {
    const updatedNotes = this.state.notes.filter(n => n.id !== note.id);
    this.setState({
      notes: updatedNotes,
    });
  };

  addData = newData => {
    const updatedNotes = [newData, ...this.state.notes];
    this.setState({
      notes: updatedNotes,
    });
  };

  handleCategory = categoryName => {
    this.setState({
      selectedCategory: categoryName,
    });
  };

  render() {
    const { showForm, categories, notes, selectedCategory } = this.state;
    return (
      <>
        <Header showForm={showForm} onShowForm={this.handleShowForm} />
        {showForm && <Form addData={this.addData} categories={categories} />}
        <main className="main">
          <aside>
            <Category
              onCategory={this.handleCategory}
              categories={categories}
            />
          </aside>
          <section>
            <Note
              onDelete={this.handleDelete}
              categories={categories}
              notes={notes}
              selectedCategory={selectedCategory}
            />
          </section>
        </main>
      </>
    );
  }
}

export default App;
