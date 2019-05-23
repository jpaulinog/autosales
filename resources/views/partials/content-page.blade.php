<section class="{{ $class }}">
    <div class="container">
        <div class="row">
            <main class="col-lg-12 col-xl-12">
                @php the_content() @endphp
                {!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav">
                    <p>' . __('Pages:', 'sage'), 'after' => '</p>
                </nav>']) !!}
            </main>
            <!--eof .col-md-* (main content)-->
        </div>
    </div>
</section>