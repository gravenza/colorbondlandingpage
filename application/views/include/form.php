<div class="container">
  <div class="clearer">

    <div class="submission-banner">
			<img src="<?php echo base_url ('images/submission-banner.png') ?>">
		</div>

    <div class="row align-items-center">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <form class="form-horizontal award-form">
            <br>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="name">Name</label>
              <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" name="name" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="category">Category</label>
              <div class="col-sm-5">
                 <div class="btn-category row">
                   <div class="col-xl-3 col-md-12 col-sm-12">
                    <button type="button" data-value="Project Owner" class="btn btn-secondary btn-block">Project Owner</button>
                   </div>
                   <div class="col-xl-3 col-md-12 col-sm-12">
                    <button type="button" data-value="Architect" class="btn btn-secondary btn-block">Architect</button>
                   </div>
                   <div class="col-xl-3 col-md-12 col-sm-12">
                    <button type="button" data-value="Contractor" class="btn btn-secondary btn-block">Contractor</button>
                   </div>
                   <div class="col-xl-3 col-md-12 col-sm-12">
                    <button type="button" data-value="Other" class="btn btn-secondary btn-block">Others</button>
                   </div>
                   <input type="hidden" name="category" value="project-owner" />
                 </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="phone">Comment</label>
              <div class="col-sm-5">
                <textarea rows="2" class="form-control form-control-sm" name="phone" style="border-radius: 15px;">
                </textarea>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="email">Email*</label>
              <div class="col-sm-5">
                <input type="email" class="form-control form-control-sm" name="email" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="phone">Phone Number</label>
              <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" name="phone" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row inhidden" style="display:none">
              <label class="control-label col-sm-2" for="occupation">Job Title</label>
              <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" name="jobtitle" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-sm-2" for="univ">Company</label>
              <div class="col-sm-5">
                <input type="text" class="form-control form-control-sm" name="univ" style="border-radius: 20px;">
              </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-2" for="file">Upload file</label>
                    <div class="col-sm-5 custom-file">
                        <input type="file" name="files[]" multiple class="form-control-file form-control file-custom" id="file" required>
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
