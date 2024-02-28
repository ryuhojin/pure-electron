const { receiveLocal } = window.electron;

receiveLocal('approachExternalServer', () => {
    alert("alert")
});