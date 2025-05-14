function CreateUpdate(){
    return(
        <div>
            <h3>Create New Update</h3>
            <div className="Create_Update">
                <label htmlFor="">Title:</label>
                <input type="text" name="title" />
                <label htmlFor="">Updates Description:</label>
                <textarea name="Desc" id=""></textarea>
                <label htmlFor="">Update Type:</label>
                <select name="" id="">
                    <option value="News">News</option>
                    <option value="Announcement">Announcement</option>
                </select>
                <button>Upload Updates</button>
            </div>
        </div>
    )
}
export default CreateUpdate