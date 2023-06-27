export function getImageUrl(person, size = 's') {
    return (
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHz7YPZGIUAV-gWnCuRHr2S2V1CWXjwTIXNQ&usqp=CAU' +
      person.imageId +
      size +
      '.jpg'
    );
  }
  