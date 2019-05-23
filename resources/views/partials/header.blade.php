@include('partials.modal')

@if (!is_front_page())

    @include('partials.page-header')

@else

    @include('partials.front-page-header')

@endif