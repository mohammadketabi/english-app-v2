import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddCard = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    word,
    definition,
    type,
    typeOptions,
    exampleOne,
    exampleTwo,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createCard,
    editCard,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!word || !definition) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editCard();
      return;
    }
    createCard();
  };

  const handleCardInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit card" : "add card"} </h3>
        {showAlert && <Alert />}

        {/* word */}
        <div className="form-center">
          <FormRow
            type="text"
            name="word"
            value={word}
            handleChange={handleCardInput}
          />

          {/* definition */}
          <FormRow
            type="text"
            name="definition"
            value={definition}
            handleChange={handleCardInput}
          />

          {/* type */}

          <FormRowSelect
            name="type"
            value={type}
            handleChange={handleCardInput}
            list={typeOptions}
          />

          {/* exampleOne */}
          <FormRow
            type="text"
            labelText="example one"
            name="exampleOne"
            value={exampleOne}
            handleChange={handleCardInput}
          />
          {/* exampleTwo */}
          <FormRow
            type="text"
            labelText="example two"
            name="exampleTwo"
            value={exampleTwo}
            handleChange={handleCardInput}
          />
          {/* Status */}

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleCardInput}
            list={statusOptions}
          />

          <div className="btn-container btn-add-card">
            {isEditing ? (
              <button
                className="btn btn-block submit-btn"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Editing Card..." : "Edit Card"}
              </button>
            ) : (
              <button
                className="btn btn-block submit-btn"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Adding Card..." : "Add Card"}
              </button>
            )}

            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddCard;
