<div class="preloader">
  <div class="preloader_image"></div>
</div>

<div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="modalLoginForm" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="row c-gutter-0">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span>×</span>
      </button>
      <div class="col-6">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h4 class="modal-title">Schedule Maintenance</h4>
          </div>
          <div class="modal-body">
            <form action="#">
              <div class="form-group has-placeholder">
                <label for="name">Your Name:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name" name="First name">
              </div>
              <div class="form-group has-placeholder">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your Email" name="email">
              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button type="submit" class="btn btn-small btn-maincolor log-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-6 ds s-overlay">
        <img src="@asset('images/modal-login-form.jpg')" alt="">
      </div>
    </div>
  </div>
</div>