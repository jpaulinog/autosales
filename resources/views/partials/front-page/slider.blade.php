<section class="page_slider">
  <div class="flexslider" data-nav="false" data-dots="true">
    <ul class="slides">
      <li class="ds bs cover-image flex-slide">
        <span class="flexslider-overlay"></span>
        <img src="@asset('images/slide01.jpg')" alt="">
        <video autoplay muted loop class="myVideo">
          <source src="@asset('images/video.mp4')" data-src="@asset('images/video.mp4')" type="video/mp4">
        </video>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="intro_layers_wrapper text-center">
                <div class="intro_layers">
                  <div class="divider-20 d-none d-lg-block d-xl-none"></div>
                  {!! $featured_words !!}
                  <div class="intro_layer">
                    <div class="slide-button">
                    {!! $featured_cta !!}
                    </div>
                  </div>
                </div> <!-- eof .intro_layers -->
              </div> <!-- eof .intro_layers_wrapper -->
            </div> <!-- eof .col-* -->
          </div><!-- eof .row -->
        </div><!-- eof .container-fluid -->
      </li>
    </ul>
  </div> <!-- eof flexslider -->
</section>