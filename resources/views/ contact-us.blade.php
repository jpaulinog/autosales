{{--
  Template Name: Contact Us
--}}

@extends('layouts.app')
@section('content')
<section class="s-pt-60 s-pb-15 s-py-lg-90 ls ms">
    <div class="container">
        <div class="row c-mb-40 c-mb-lg-0">
            <div class="col-md-6 col-lg-3">
                <div class="media contact-icon">
                    <div class="icon-styled color-main fs-40">
                        <i class="ico-map"></i>
                    </div>

                    <div class="media-body">
                        <h6>
                            Adress
                        </h6>
                        <p>
                            1600 NW North River Dr.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="media contact-icon">
                    <div class="icon-styled color-main fs-40">
                        <i class="ico-call"></i>
                    </div>

                    <div class="media-body">
                        <h6>
                            Phone
                        </h6>
                        <p>
                            +1 786 212 3146
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="media contact-icon">
                    <div class="icon-styled color-main fs-40">
                        <i class="ico-email"></i>
                    </div>

                    <div class="media-body">
                        <h6>
                            Email
                        </h6>
                        <p>
                            info@mpg-autosales.com
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="media contact-icon">
                    <div class="icon-styled color-main fs-40">
                        <i class="ico-clock"></i>
                    </div>

                    <div class="media-body">
                        <h6>
                            Opening time
                        </h6>
                        <p>
                            8.00am - 8.00pm
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
<section class="ls map-left container-px-0">
				<div class="container-fluid">
					<div class="row align-items-center c-gutter-85">
						<div class="col-xl-6 col-lg-6 col-md-6 col-xs-12">
							<div class="page_map">
								<div class="marker">
									<div class="marker-address">1600 NW North River Dr.</div>
									<div class="marker-title">Fourth Marker</div>
									<div class="marker-description">
										<p><strong>1600 NW North River Dr.</strong>.<br>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit. Aliquid cumque,
											deserunt dolor.
										</p>
									</div>
									<img class="marker-icon" src="@asset('images/map_marker_icon.png')" alt="">
								</div>
								<!-- .marker -->
							</div>
							<!--.col-* -->
						</div>
						<div class="col-xl-4 col-lg-5 col-md-5 col-12">
							<div class="contact-item">
								<h3 class="special-heading">Contact<span class="text-gradient">Us</span></h3>
								<div class="divider-35"></div>
								@while(have_posts()) @php the_post() @endphp
                                @include('partials.content-page')
                                @endwhile
							</div>
						</div>
						<!--.col-* -->
					</div>
				</div>
			</section>

@endsection