(
    async () => {
        await Promise.all(req.body.subjects.map(subject => {
            let subjectToBeSaved = new Subject({
                title: subject.title,
                user_id: decoded._id,
                study_path_id: study_path_id
            })
            return subjectToBeSaved.save()
        }));
    }
)()