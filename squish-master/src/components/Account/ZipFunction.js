import $ from 'jquery'



export const convertZip = () => {
  // const apiKey = process.env.REACT_APP_ZIPCODE_API_KEY
  const clientKey = process.env.REACT_APP_ZIPCODE_CLIENT_KEY
  const cache = {}
  const container = $("div.complete-profile-bg")
  const errorSpan = container.find("span#zipErrors")

   
  // Handle Successful Response
  function handleResp(data) {
    // check for error
    if (data.error_msg) {
      errorSpan.text(data.error_msg)
       
    } else if ("city" in data) {
      // Set City and State
      container.find("input[name='city']").val(data.city)
      container.find("input[name='state']").val(data.state)
    }
  }

  // Set up Event Handlers
  container.find("input[name='zipcode']").on("change", function() {
    // Get Zip Code
    const zipcode = $(this).val().substring(0, 5)
    
    if (zipcode.toString().length === 5 && /^[0-9]+$/.test(zipcode)) {
      // Clear Error
       
      errorSpan.empty();
      // Check Cache
      if (zipcode in cache) {
        handleResp(cache[zipcode])
      } else {
        // Build Url
        const url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians"
        // Make AJAX REquest
        $.ajax({
          "url": url,
          "dataType": "json"
        }).done(function(data) {
          handleResp(data);
          // Store in Cache
           
          cache[zipcode] = data
        }).fail(function(data) {
          let json
            
          if (data.responseText && (json = $.parseJSON(data.responseText))) {
            // Store in Cache 
             
            cache[zipcode] = json
            // Check for error
            if (json.error_msg) {
              errorSpan.text(json.error_msg)
               
            } else {
              errorSpan.text("Request Failed.")
               
            }
          }
        })
      }
    }
  }).trigger("change")
}