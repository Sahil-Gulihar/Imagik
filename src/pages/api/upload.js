const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const apiKey=process.env.IMGUR_CLIENT_ID;
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
  
    setStatus('Uploading...');
  
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64data = reader.result.split(',')[1];
  
        const response = await fetch('https://api.imgur.com/3/image/', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID '+apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64data,
            type: 'base64'
          })
        });
  
        const data = await response.json();
        console.log('Response:', data);
        setStatus(`Upload ${data.success ? 'successful' : 'failed'}: ${JSON.stringify(data)}`);
      };
    } catch (error) {
      console.error('Error:', error);
      setStatus(`Error: ${error.message}`);
    }
  };