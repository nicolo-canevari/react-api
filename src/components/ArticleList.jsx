import { useState, useEffect } from 'react';

// importo axios
import axios from 'axios';

// Stato per i dati del form
const initialFormData = {

    title: "",
    autore: "",
    contenuto: "",
    categoria: "",

};


const ArticleList = () => {

    // utilizzo dello useState per la gestione dell rray di oggetti
    const [posts, setPosts] = useState([]);
    // gestione delle informazioni raccolte dai campi del form
    const [formData, setFormData] = useState(initialFormData)

    // funzione di gestione chiamata all'API
    function fetchPosts() {

        axios.get("http://localhost:3000/posts")
            .then((res) => {

                setPosts(res.data);
            })
            .catch(function (error) {
                console.log(error);

            }
            )

    }

    // richiamo la funzione di richiesta dati al caricamento del componente solo al primo rendering
    useEffect(fetchPosts, []);


    // Funzione di gestione delle informazioni dei campi del form
    function handleFormData(e) {

        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormData((currentFormData) => ({

            ...currentFormData,
            [e.target.name]: value,

        }));

    }

    // Funzione per rimuovere un articolo
    const handleDelete = (id) => {

        // filtro l'artiicolo per id e lo rimuovo dalla mia lista
        setPosts(posts.filter(post => post.id !== id));

    };

    // Funzione per gestire il submit del form
    const handleSubmit = (event) => {

        // evito il refresh della pagina
        event.preventDefault();

        // destructuring dei dati del form con successiva creazione di un nuovo articolo
        const { title, autore, contenuto, categoria } = formData;

        if (title && autore && contenuto && categoria) {
            const newPost = {
                id: posts.length + 1,
                title,
                autore,
                contenuto,
                categoria

            };

            // aggiungo il nuovo articolo alla mia lista
            setPosts([...posts, newPost]);

            // resetto lo stato del form (ripristina i campi "vuoti")
            setFormData({

                title: '',
                autore: '',
                contenuto: '',
                categoria: ''

            });

        }

    };

    return (

        <div>

            <h2>Aggiungi un Nuovo Articolo</h2>

            {/* Form per aggiungere un articolo */}
            <form id="formPost" action="#" onSubmit={handleSubmit}>

                {/* Campo per il titolo dell'articolo */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormData}
                    placeholder="Inserisci il titolo dell'articolo"
                />

                {/* Campo per l'autore dell'articolo */}
                <input
                    type="text"
                    name="autore"
                    value={formData.autore}
                    onChange={handleFormData}
                    placeholder="Inserisci l'autore dell'articolo"
                />

                {/* Campo per il contenuto dell'articolo */}
                <textarea
                    name="contenuto"
                    value={formData.contenuto}
                    onChange={handleFormData}
                    placeholder="Inserisci il contenuto dell'articolo"
                ></textarea>

                {/* Campo per la categoria dell'articolo */}
                <input
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleFormData}
                    placeholder="Inserisci la categoria dell'articolo"
                />

                {/* Bottone per inviare il form */}
                <button type="submit">Aggiungi Articolo</button>

            </form>

            {/* Lista degli articoli */}
            <ul>

                {posts.map(post => (

                    <li key={post.id}>

                        <h3>{post.title}</h3>
                        <p><strong>Contenuto:</strong> {post.content}</p>
                        <img src={post.image} alt={post.title} />
                        <p>{post.tags.join(', ')}</p>
                        <button onClick={() => handleDelete(post.id)}>Elimina</button>

                    </li>

                ))}

            </ul>

        </div>

    );

}


export default ArticleList;