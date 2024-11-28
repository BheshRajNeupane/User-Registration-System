
// pop up dialog model
 export const showMessageModal = function Modal (type, message) {
    const modalTitle = $('#messageModalLabel');
    const modalContent = $('#messageContent');

    if (type === 'success') {
        modalTitle.text('Success'); 
        modalContent.text(message); 
        modalTitle.removeClass('text-danger').addClass('text-success'); 
    } else if (type === 'failure') {
        modalTitle.text('Failure'); 
        modalContent.text(message); 
        modalTitle.removeClass('text-success').addClass('text-danger'); 
    }
     $('#messageModal').modal('show'); 
}