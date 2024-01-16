import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BSModalComponent({ modalBody, show, setShow, modalHeader = null}) {
    const handleClose = () => setShow(false);
    const formatComment = (commentLog) => {
        return commentLog?.split('<br/>').map((str) => {
            return '<strong>' + str.replace(/]:/, ']:</strong>') + '<br/>'
        }).join('')
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                { modalHeader && 
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}<br/></Modal.Title>
                </Modal.Header> 
                }
                <Modal.Body dangerouslySetInnerHTML={{__html: formatComment(modalBody)}}></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default BSModalComponent;