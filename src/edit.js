/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps , InspectorControls  , MediaUpload, RichText} from '@wordpress/block-editor';
import { PanelBody, TextControl, IconButton , ColorPalette , RangeControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes , setAttributes}) {
	const blockProps = useBlockProps();
	const { title ,titleColor , content , bgImage , colorOverelay , opacityOverelay} = attributes;

	const marks = [
		{
			value: 10,
			label: '10',
		},
		{
			value: 20,
			label: '20',
		},
		{
			value: 40,
			label: '40',
		},
		{
			value: 50,
			label: '50',
		},
		{
			value: 60,
			label: '60',
		},
		{
			value: 80,
			label: '80',
		},
		{
			value: 100,
			label: '100',
		},
	];

	const updateContent = (event)=>{
		setAttributes({content : event})
	}
	const updateTitle = (event) =>{
		setAttributes( { title: event} )
	}
	const updateColorTitle = (event) =>{
		setAttributes( { titleColor: event} )
	}
	const onSelectImageBg = (newImage) => {
		setAttributes({bgImage: newImage.sizes.full.url })
	}
	const changeOverelay = (newColor) => {
		setAttributes({colorOverelay: newColor})
	}
	const changeOpacity = (opacity) =>{
		let value = opacity * 0.01
		setAttributes({opacityOverelay: value})
	}
	return (
		[
		<InspectorControls>
			
			<PanelBody title='Parametre Couleur du Titre'>
				<p><strong>Selectioner un couleur de titre</strong></p>
				<ColorPalette 
				value={titleColor}
				onChange={updateColorTitle}/>
			</PanelBody>
			<PanelBody title='Arière plan du block'>
				<p><strong>Selectioner Votre image</strong></p>
				<MediaUpload 
					onSelect={onSelectImageBg}
					type="image"
					value={bgImage}
					render={({open})=>(
						<IconButton
							className='editor-media-placeholder__button is-button is-default is-large'
							icon={'upload'}
							onClick={open}
						>
							Arière-plan
						</IconButton>
					)}
				/>
				<p><strong>Overelay</strong></p>
				<ColorPalette 
				value={colorOverelay}
				onChange={changeOverelay}/>
				<p><strong>Opacity</strong></p>
				<RangeControl onChange={ changeOpacity } marks={marks} min={0} max={100} step={1}/>
			</PanelBody>
		</InspectorControls>
				,
		<div className='safidi-container-block' 
					style={{
						backgroundImage: `url(${bgImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center', 
						backgroundRepeat: 'no-repeat'
					}}
		>
			<div className='safidi-overelay' 
				style={{
					backgroundColor: `${colorOverelay}`,
					opacity: opacityOverelay
				}}></div>
			<RichText
				{ ...blockProps }
				key="editable"
				tagName="h2" 
				value={ title } 
				allowedFormats={ [ 'core/bold', 'core/italic' ] } 
				onChange={ updateTitle } 
				placeholder={ __( 'Heading...' ) } 
				style={{color: titleColor}}
			/>
			<RichText
				{ ...blockProps }
				key="editable"
				tagName="p" 
				value={ content } 
				allowedFormats={ [ 'core/bold', 'core/italic' ] } 
				onChange={ updateContent } 
				placeholder={ __( 'Your content...' ) } 
			/>
		</div>
			
				]
	);
}
