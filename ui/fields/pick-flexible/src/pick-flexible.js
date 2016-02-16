/*global jQuery, _, Backbone, Mn */
const $ = jQuery;

import { PickFlexibleCollection, PickFlexibleModel } from './models/pick-flexible-model';
import { PickFlexibleList } from './views/pick-flexible-list';
import { PickFlexibleForm } from './views/pick-flexible-form';

export const PickFlexible = Mn.LayoutView.extend( {
	template: _.template( $( '#pick-flexible-layout-template' ).html() ),

	regions: {
		list     : '.pods-ui-file-list',
		ui_region: '.pods-ui-region', // "Utility" container for flex input to use
		form     : '.pods-ui-form'
	},

	field_meta: {}, // @todo: things to be yanked when we abstract our field data needs

	uploader: {},

	initialize: function () {
		// @todo: abstract this out.  All fields need access to the field meta and individual views shouldn't have to
		// worry about marshalling that data around.
		this.field_meta = this.getOption( 'field_meta' );

		this.collection = new PickFlexibleCollection( this.getOption( 'model_data' ), this.field_meta );
		this.model = new PickFlexibleModel();
	},

	onRender: function () {
		// @todo: abstract this out.  All fields need access to the field meta and individual views shouldn't have to
		// worry about marshalling that data around.
		var listView = new PickFlexibleList( { collection: this.collection, field_meta: this.field_meta } );
		var formView = new PickFlexibleForm( { field_meta: this.field_meta } );

		this.showChildView( 'list', listView );
		this.showChildView( 'form', formView );
	},

	/**
	 * Fired by a remove:file:click trigger in any child view
	 *
	 * @param childView View that was the source of the event
	 */
	onChildviewRemoveFileClick: function ( childView ) {
		this.collection.remove( childView.model );
	},

	/**
	 * Fired by a add:file:click trigger in any child view
	 *
	 * plupload fields should never generate this event as it places a shim over our button and handles the event
	 * internally
	 */
	onChildviewAddFileClick: function () {
		// Invoke the uploader
		this.uploader.invoke();
	},

	/**
	 * Concrete uploader implementations simply need to: this.trigger( 'added:files', new_files )
	 *
	 * @param {Object[]} data An array of model objects to be added
	 */
	onAddedFiles: function ( data ) {
		this.collection.add( data );
	}

} );
