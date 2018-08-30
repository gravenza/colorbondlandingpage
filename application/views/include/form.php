<div class="container">
  <div class="clearer">

    <div class="submission-banner">
			<img src="<?php echo base_url ('images/submission-banner.png') ?>">
		</div>

    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <form class="form-horizontal award-form">
            <br>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="name">Name</label>
              <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" name="name" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="email">Email*</label>
              <div class="col-sm-4">
                <input type="email" class="form-control form-control-sm" name="email" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="category">Category</label>
              <div class="col-sm-4">
                 <div class="btn-category row">
                   <div class="col-xl-4">
                    <button type="button" class="btn btn-warning btn-block">Industrial</button>
                   </div>
                   <div class="col-xl-4">
                    <button type="button" class="btn btn-secondary btn-block">Comercial</button>
                   </div>
                   <div class="col-xl-4">
                    <button type="button" class="btn btn-secondary btn-block">Residential</button>
                   </div>
                 </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="phone">Phone Number</label>
              <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" name="phone" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="univ">University</label>
              <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" name="univ" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="file">Upload file</label>
                    <div class="col-sm-4 custom-file">
                        <input type="file" class="form-control-file form-control file-custom" id="file" required>
                    </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-2 offset-sm-2">
                <button type="submit" class="btn btn-warning btn-block">Submit</button>
              </div>
            </div>
          </form>
      </div>
    </div>
  </div>
</div>
