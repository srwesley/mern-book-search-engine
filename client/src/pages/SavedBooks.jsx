import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

// Added Apollo GraphQL elements
import { useQuery, useMutation } from "@apollo/client"; // Imports the useQuery and UseMutation hooks
import { GET_ME } from "../utils/queries"; // Imports the GET_ME query
import { REMOVE_BOOK } from "../utils/mutations"; // Imports the REMOVE_BOOK mutation

const SavedBooks = () => {
    // Defines the GET_ME API call
    const { loading, data } = useQuery(GET_ME);
    console.log("LOADING: ", loading);
    console.log("DATA: ", data);
    let userData = data?.me || {};

    // Defines the remove book mutation
    const [removeBook] = useMutation(REMOVE_BOOK);
   
    // Creates function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            console.log("FALSE: ", false);
            return false;
        }

        try {
            // Calls remove book
            const { user } = await removeBook({
                variables: { bookId: bookId },
            });
            console.log(user);
            // Upon success, remove book's id from localStorage
            userData = user;
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
     };

    // If data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Viewing saved books!</h1>
                </Container>
            </div>
            <Container>
                <h2 className="pt-5">
                    {userData.savedBooks?.length
                        ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? "book" : "books"}:`
                        : "You have no saved books!"}
                </h2>
                <Row>
                    {userData.savedBooks?.map((book) => (
                        // return (
                            <Col key={book.bookId} md="4">
                                <Card border="dark">
                                    {book.image ? (
                                        <Card.Img
                                            src={book.image}
                                            alt={`The cover for ${book.title}`}
                                            variant="top"
                                        />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <p className="small">Authors: {book.authors}</p>
                                        <Card.Text>
                                            {book.description}
                                            <br />
                                            <a href={book.link} target="_blank" rel="noreferrer">
                                                Preview on Google Books
                                            </a>
                                        </Card.Text>
                                        <Button
                                            className="btn-block btn-danger"
                                            onClick={() => handleDeleteBook(book.bookId)}
                                        >
                                            Delete this Book!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        // )
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default SavedBooks;