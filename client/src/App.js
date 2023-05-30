import './App.css';
import { getCategories} from './services/Categories';
import React, { Component } from 'react';
import Header from './components/header';
import Form from './components/form';
import Category from './components/categories';
import Note from './components/note';
import axios from 'axios';


class App extends Component {
  state = {
    categories: getCategories(),
    notes: [],
    showForm: false,
    selectedCategory: null,
  };


  async componentDidMount() {
    try {
      const { data: notes } = await axios.get('http://localhost:4000/api/notes/');
      this.setState({
        notes:notes
      })
    } catch (error) {
      console.error(error);
    }
  }
  

  handleShowForm = () => {
    const updatedShowForm = !this.state.showForm;
    this.setState({
      showForm: updatedShowForm,
    });
  };

  handleDelete = async note => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${note._id}`)
      
      const updatedNotes = this.state.notes.filter(n => n._id !== note._id);
      this.setState({
        notes: updatedNotes,
      });
      
    } catch (error) {
      console.error(error);      
    }
  };

  addData = async newData => {
    try {
      const { data: newNote}  =  await axios.post('http://localhost:4000/api/notes', newData)
      const updatedNotes = [newNote, ...this.state.notes];
      this.setState({
        notes: updatedNotes,
      });      
    } catch (error) {
      console.error(error);      
    }

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
